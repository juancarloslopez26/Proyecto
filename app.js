const express = require('express');
const connectDB = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Stats = require('./stats');

const app = express();
app.use(express.json());
const port = 4001;
connectDB();

// Configuración de Redis


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
  apis: ['./app.js']
};

// Inicializa swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - Nombre
 *         - Edad
 *         - Nacionalidad
 *         - Equipo
 *         - Valor
 *       properties:
 *         Nombre:
 *           type: string
 *           description: El nombre del jugador
 *         Edad:
 *           type: number
 *           description: La edad del jugador
 *         Nacionalidad:
 *           type: string
 *           description: La nacionalidad del jugador
 *         Equipo:
 *           type: string
 *           description: El equipo actual del jugador
 *         Valor:
 *           type: number
 *           description: El valor de mercado del jugador
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Obtiene todas las estadísticas de los jugadores
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
app.get('/stats', async (req, res) => {
  try {
    const stats = await Stats.find();
    
    res.json(stats);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
/**
 * @swagger
 * /stats/nombre/{nombre}:
 *   get:
 *     summary: Obtiene las estadísticas de un jugador por nombre
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del jugador
 *     responses:
 *       200:
 *         description: Estadísticas del jugador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Jugador no encontrado
 */
app.get('/stats/nombre/:nombre', async (req, res) => {
  try {
    const stats = await Stats.findOne({ Nombre: req.params.nombre });
    if (!stats) throw new Error('Jugador no encontrado');
    res.json(stats);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
/**
 * @swagger
 * /stats/{id}:
 *   get:
 *     summary: Obtiene las estadísticas de un jugador por ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: Estadísticas del jugador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Jugador no encontrado
 */
app.get('/stats/:id', async (req, res) => {
  try {
    const stats = await Stats.findById(req.params.id);
    if (!stats) throw new Error('Jugador no encontrado');
    res.json(stats);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/**
 * @swagger
 * /stats:
 *   post:
 *     summary: Crea una nueva estadística de jugador
 *     tags: [Stats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Jugador creado con éxito
 */
app.post('/stats', async (req, res) => {
    try {
      const { Nombre, Edad, Nacionalidad, Equipo, Valor } = req.body;
      const stats = new Stats({ Nombre, Edad, Nacionalidad, Equipo, Valor });
      await stats.save();
      
      // Devolver el jugador creado, incluyendo su ID
      res.status(201).json({ success: true, stats });
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

/**
 * @swagger
 * /stats/{id}:
 *   put:
 *     summary: Actualiza las estadísticas de un jugador por ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Jugador actualizado con éxito
 *       404:
 *         description: Jugador no encontrado
 */
app.put('/stats/:id', async (req, res) => {
  try {
    const stats = await Stats.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stats) throw new Error('Jugador no encontrado');
    res.json({ success: true });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/**
 * @swagger
 * /stats/{id}:
 *   delete:
 *     summary: Elimina las estadísticas de un jugador por ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: Jugador eliminado con éxito
 *       404:
 *         description: Jugador no encontrado
 */
app.delete('/stats/:id', async (req, res) => {
  try {
    const stats = await Stats.findByIdAndDelete(req.params.id);
    if (!stats) throw new Error('Jugador no encontrado');
    res.json({ success: true });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

/**
 * @swagger
 * /stats/{id}:
 *   patch:
 *     summary: Actualiza parcialmente las estadísticas de un jugador por ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Jugador actualizado con éxito
 *       404:
 *         description: Jugador no encontrado
 */
app.patch('/stats/:id', async (req, res) => {
    try {
      const updates = req.body;
      const stats = await Stats.findByIdAndUpdate(req.params.id, updates, {
        new: true, // Devuelve el documento actualizado
        runValidators: true, // Valida las actualizaciones según el esquema
      });
  
      if (!stats) {
        return res.status(404).send('Jugador no encontrado');
      }
  
      res.json({ success: true, stats });
    } catch (error) {
      res.status(404).send(error.message);
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
