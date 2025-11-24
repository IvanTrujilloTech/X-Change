const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/connection');

// Middleware para parsear JSON
app.use(express.json());

// Rutas existentes
app.use('/usuarios', require('./users/user.routes'));
app.use('/documentos', require('./services/documentos'));
app.use('/ofertas', require('./services/ofertas'));
app.use('/paises', require('./services/paises'));
app.use('/perfiles', require('./services/perfiles'));
app.use('/solicitudes', require('./services/solicitudes')); 
app.use('/roles', require('./services/roles'));


// Ruta de prueba para la raíz
app.get('/', (req, res) => {
  res.json({ 
    message: '¡API funcionando!', 
    rutas: {
      usuarios: '/usuarios',
      documentos: '/documentos',
      ofertas: '/ofertas',
      paises: '/paises',
      perfiles: '/perfiles',
      solicitudes: '/solicitudes',
      roles: '/roles'
    }
  });
});


// Para el error de Chrome (opcional)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(200).json({});
});

// Conexión a BD e inicio del servidor
db.connect()
  .then((client) => {
    console.log('✅ Conectado a PostgreSQL en Supabase');
    client.release();
    
    app.listen(port, () => {
      console.log(`🚀 Servidor en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    process.exit(1);
  });