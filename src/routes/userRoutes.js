// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
// const userController = require('../controllers/userController'); // Importa tu controlador si existe

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Recupera una lista completa de usuarios del sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada exitosamente.
 */
router.get('/', (req, res) => {
    // Lógica para obtener usuarios
    res.status(200).json([]);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a recuperar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', (req, res) => {
    // Lógica para obtener usuario por ID
    res.status(200).json({ id: req.params.id, name: 'X-Change' });
});

module.exports = router;
