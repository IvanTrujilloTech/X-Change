const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints de usuarios
 */

let usuarios = [
  { id_usuario: 1, email: "super@erasmus.com", password: "pass123", id_rol: 1 },
  { id_usuario: 2, email: "admin1@erasmus.com", password: "adminpass", id_rol: 2 },
  { id_usuario: 3, email: "admin2@erasmus.com", password: "adminpass", id_rol: 2 },
  { id_usuario: 4, email: "prof1@erasmus.com", password: "profpass", id_rol: 3 },
  { id_usuario: 5, email: "prof2@erasmus.com", password: "profpass", id_rol: 3 },
  { id_usuario: 6, email: "alumno1@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 7, email: "alumno2@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 8, email: "alumno3@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 9, email: "alumno4@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 10, email: "alumno5@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 11, email: "alumno6@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 12, email: "alumno7@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 13, email: "alumno8@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 14, email: "alumno9@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 15, email: "alumno10@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 16, email: "alumno11@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 17, email: "alumno12@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 18, email: "alumno13@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 19, email: "alumno14@mail.com", password: "alupass", id_rol: 4 },
  { id_usuario: 20, email: "alumno15@mail.com", password: "alupass", id_rol: 4 }
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', (req, res) => res.json(usuarios));

/**
 * @swagger
 * /users/{id_usuario}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id_usuario', (req, res) => {
    const id = parseInt(req.params.id_usuario, 10);
    const usuario = usuarios.find(u => u.id_usuario === id);
    if (usuario) res.json(usuario);
    else res.status(404).json({ error: "Usuario no encontrado" });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               id_rol:
 *                 type: integer
 *             example:
 *               email: "nuevo@mail.com"
 *               password: "pass123"
 *               id_rol: 4
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/', (req, res) => {
    const { email, password, id_rol } = req.body;
    if (!email || !password || !id_rol) return res.status(400).json({ error: "Faltan campos obligatorios" });

    const id_usuario = usuarios.length ? usuarios[usuarios.length - 1].id_usuario + 1 : 1;
    const nuevoUsuario = { id_usuario, email, password, id_rol };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

/**
 * @swagger
 * /users/{id_usuario}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               id_rol:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: ID inválido o campos faltantes
 */
router.put('/:id_usuario', (req, res) => {
    const id = parseInt(req.params.id_usuario, 10);
    const { email, password, id_rol } = req.body;
    const usuario = usuarios.find(u => u.id_usuario === id);
    if (!usuario || !email || !password || !id_rol) return res.status(400).json({ error: "ID inválido o campos faltantes" });

    usuario.email = email;
    usuario.password = password;
    usuario.id_rol = id_rol;

    res.json(usuario);
});

/**
 * @swagger
 * /users/{id_usuario}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id_usuario', (req, res) => {
    const id = parseInt(req.params.id_usuario, 10);
    const index = usuarios.findIndex(u => u.id_usuario === id);
    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    const eliminado = usuarios.splice(index, 1);
    res.json({ deleted: eliminado[0] });
});

module.exports = router;
