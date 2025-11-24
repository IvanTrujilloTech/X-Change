const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
app.use(express.json());

// Swagger config
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API X-Change',
            version: '1.0.0',
        }
    },
    apis: [path.join(__dirname, 'routes/*.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Rutas
app.use('/users', require('./routes/userRoutes'));
app.use('/perfiles', require('./routes/perfilRoutes'));
app.use('/documentos', require('./routes/documentoRoutes'));
app.use('/solicitudes', require('./routes/solicitudRoutes'));
app.use('/roles', require('./routes/rolRoutes'));
app.use('/ofertas', require('./routes/ofertaRoutes'));
app.use('/paises', require('./routes/paisRoutes')); // ahora directo /paises

app.listen(3000, () =>
    console.log("Swagger en http://localhost:3000/api-docs")
);
