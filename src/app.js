const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
// const dotenv = require('dotenv'); // Si necesitas cargar variables de entorno desde .env
// dotenv.config();

const app = express();
const port_X_Change = process.env.PORT || 3000; // Usa el puerto de .env si existe

// --- Configuración de Swagger ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Versión de OpenAPI
        info: {
            title: 'API del Proyecto de Grupo',
            version: '1.0.0',
            description: 'Documentación de la API generada con Swagger',
        },
        servers: [
            {
                url: `http://localhost:${port_X_Change}/api`, // Asumiendo que usas /api como prefijo global
            },
        ],
    },
    // MUY IMPORTANTE: La ruta a tus archivos de rutas DEBE ser correcta desde la raíz del proyecto
    apis: [path.join(__dirname, '/routes/userRoutes.js')], // Usa path.join para mayor compatibilidad de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// --- Middlewares y Rutas Existentes ---

app.use(express.json()); // Para parsear bodies JSON

// Importa las rutas de usuario
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); // Monta las rutas de usuario bajo /api/users

// Configura la ruta para la interfaz de Swagger UI
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Iniciar el servidor
app.listen(port_X_Change, () => {
    console.log(`Servidor corriendo en http://localhost:${port_X_Change}`);
    console.log(`Documentación de la API disponible en http://localhost:${port_X_Change}/api-docs`);
});
