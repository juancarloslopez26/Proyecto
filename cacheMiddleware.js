const redis = require('redis');

// Configuración del cliente de Redis
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});

// Conexión al cliente de Redis
redisClient.on('error', (err) => {
    console.error('Error en Redis:', err);
});

redisClient.on('connect', () => {
    console.log('Conectado a Redis');
});

// Middleware para caché
const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl; // Usar la URL original como clave para el caché

    // Intenta obtener datos del caché
    redisClient.get(key, (err, data) => {
        if (err) {
            console.error('Error al acceder al caché:', err);
            return next();
        }
        if (data) {
            // Si hay datos en caché, devuelve los datos
            return res.json(JSON.parse(data)); // Devuelve los datos del caché
        }
        // Si no hay datos en caché, continúa a la siguiente función
        next();
    });
};

// Middleware para guardar en caché
const cacheSaveMiddleware = (key, data) => {
    redisClient.setex(key, 3600, JSON.stringify(data)); // Guardar en caché durante 1 hora
};

module.exports = {
    cacheMiddleware,
    cacheSaveMiddleware
};
