const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3000;

// configuracion de supabase
// url de proyecto supabase:
const supabaseUrl = 'https://jleeuizmswmchhrsvrbs.supabase.co';

// clave anonima (anon key) para autenticacion
const supabaseAnonKey = 'sb_publishable_qGfF4I4xocv9fxzwxplMQA_-meWzU0u';

// clave de servicio (service role key) para operaciones de base de datos
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// inicializacion de cliente supabase para autenticacion
const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);

// inicializacion de cliente supabase para base de datos con service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// middleware de express
// habilito cors para desarrollo local
app.use(cors());
// express leera json
app.use(express.json());

// ruta para iniciar login con github
app.get('/auth/github', async (req, res) => {
    console.log('empezando flujo de oauth con github...');

    // llamo al servicio de autenticacion de supabase para empezar redireccion a github
    const { data, error } = await supabaseAuth.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:3000/auth/callback',
        },
    });

    if (error) {
        console.error(`error al iniciar signinwithoauth ${error}`);
        return res.status(500).json({ error: `error interno al iniciar sesion con github detalles ${error.message}` });
    }

    // redirijo navegador a url de autenticacion de github/supabase
    console.log('redirigiendo a url de autenticacion ' + data.url);
    return res.redirect(data.url);
});

// ruta de callback para oauth
app.get('/auth/callback', (req, res) => {
    // Supabase envia el token en el hash fragment, no en query
    // Servimos una pagina que extrae el token del hash y lo muestra
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OAuth Callback</title>
</head>
<body>
    <h1>Procesando autenticacion...</h1>
    <div id="result"></div>

    <script>
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        if (accessToken) {
            document.getElementById('result').innerHTML = \`
                <p><strong>Access Token:</strong></p>
                <textarea readonly style="width: 100%; height: 100px;">\${accessToken}</textarea>
                <p>Copia este token para usar en Postman con Authorization: Bearer <token></p>
                <p><a href="/">Volver a la pagina principal</a></p>
            \`;
        } else {
            document.getElementById('result').innerHTML = '<p>Error: No se encontro el token de acceso.</p>';
        }
    </script>
</body>
</html>
    `);
});

// middleware de autenticacion (requireauth)
// funcion verifica si peticion tiene un token bearer jwt valido
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'acceso denegado token bearer jwt es necesario' });
    }

    const token = authHeader.split(' ')[1]; // extraigo token la parte despues de bearer

    try {
        // verifico token con jwt secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // permito que solicitud siga a ruta protegida
    } catch (error) {
        console.error(`token invalido o expirado ${error.message}`);
        return res.status(401).json({ error: 'token invalido o expirado vuelve a iniciar sesion' });
    }
}


// ruta de api protegida para acceder a cualquier tabla
// aplico middleware requireauth a ruta
app.get('/api/datos/:tabla_nombre', requireAuth, async (req, res) => {
    const { tabla_nombre } = req.params; // obtengo el nombre de la tabla de la url
    const user = req.user; // obtengo usuario autenticado

    console.log(`usuario ${user.sub} solicitando datos de la tabla: ${tabla_nombre}`);

    // lista de tablas que permito exponer publicamente
    const tablas_permitidas = ['ofertas', 'documentos', 'paises', 'roles', 'solicitudes', 'usuarios', 'perfiles'];

    // logica de seguridad: solo permito consultar tablas de mi lista
    if (!tablas_permitidas.includes(tabla_nombre)) {
        return res.status(400).json({ error: 'tabla no valida o no permitida' });
    }

    // hago consulta a base de datos de supabase
    const { data: datos, error: dbError } = await supabase
        .from(tabla_nombre) // uso el parametro dinamico
        .select('*');

    if (dbError) {
        console.error(`error de base de datos ${dbError.message}`);
        // este error podria ser por row-level-security no configurado
        return res.status(500).json({ error: `error al consultar tabla ${tabla_nombre} detalles ${dbError.message}` });
    }

    // exito
    res.json({
        mensaje: `consulta exitosa a la tabla ${tabla_nombre} por ${user.email}`,
        usuario_id: user.sub,
        datos: datos
    });
});


// ruta para servir index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// inicio de servidor
app.listen(PORT, () => {
    console.log(`servidor express corriendo en http://localhost:${PORT}`);
    console.log(`para iniciar sesion con github voy a http://localhost:${PORT}/auth/github o usa la pagina principal`);
});