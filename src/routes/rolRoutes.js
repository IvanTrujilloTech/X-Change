const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Tipos de usuarios (fijos)
 */

const roles = [
  { id: 1, tipo: "SuperAdmin" },
  { id: 2, tipo: "Admin" },
  { id: 3, tipo: "Profesor" },
  { id: 4, tipo: "Alumno" }
];

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/', (req, res) => res.json(roles));

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 */
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const rol = roles.find(r => r.id === id);
    if (rol) res.json(rol);
    else res.status(404).json({ error: "Rol no encontrado" });
});

module.exports = router;
