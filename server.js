const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

// configuracion de supabase
// url de proyecto supabase:
const supabaseUrl = 'https://jleeuizmswmchhrsvrbs.supabase.co'; 

// clave publica (publishable key)
const supabaseAnonKey = 'sb_publishable_qGfF4I4xocv9fxzwxplMQA_-meWzU0u'; 

// inicializacion de cliente supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// middleware de express
// habilito cors para desarrollo local
app.use(cors());
// express leera json
app.use(express.json());

// ruta para iniciar login con github
app.get('/auth/github', async (req, res) => {
    // uso url temporal de supabase para ver token
    // despues del login de github token jwt aparecera aqui para que lo copie para postman
    const redirectTo = 'https://supabase.com/dashboard/auth/callback'; 
    
    console.log('empezando flujo de oauth con github...');

    // llamo al servicio de autenticacion de supabase para empezar redireccion a github
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: redirectTo,
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

// middleware de autenticacion (requireauth)
// funcion verifica si peticion tiene un token bearer jwt valido
async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'acceso denegado token bearer jwt es necesario' });
    }

    const token = authHeader.split(' ')[1]; // extraigo token la parte despues de bearer

    // verifico token con supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError) {
        console.error(`token invalido o expirado ${authError.message}`);
        return res.status(401).json({ error: 'token invalido o expirado vuelve a iniciar sesion' });
    }
    
    // si token es valido guardo objeto user en solicitud
    req.user = user;
    next(); // permito que solicitud siga a ruta protegida
}


// ruta de api protegida para acceder a cualquier tabla
// aplico middleware requireauth a ruta
app.get('/api/datos/:tabla_nombre', requireAuth, async (req, res) => {
    const { tabla_nombre } = req.params; // obtengo el nombre de la tabla de la url
    const user = req.user; // obtengo usuario autenticado

    console.log(`usuario ${user.id} solicitando datos de la tabla: ${tabla_nombre}`);

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
        usuario_id: user.id,
        datos: datos 
    });
});


// inicio de servidor
app.listen(PORT, () => {
    console.log(`servidor express corriendo en http://localhost:${PORT}`);
    console.log(`para iniciar sesion con github voy a http://localhost:${PORT}/auth/github`);
});