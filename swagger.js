const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Opciones para la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FIFA Stats API',
      version: '1.0.0',
      description: 'API para gestionar estadísticas de jugadores de fútbol'
    },
    servers: [
      {
        url: 'http://localhost:4001',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./app.js','stats.js'] // Archivos donde documentas tus rutas
};

// Inicializa swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Función para configurar Swagger en tu aplicación Express
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
