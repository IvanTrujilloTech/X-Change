const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Perfiles
 *   description: Datos personales de los usuarios
 */

let perfiles = [
  { id_usuario: 1, nombre: "Carlos", apellido1: "Gómez", apellido2: "Ruiz", telefono: "666111222", identificacion: "X1234567A", email_tutor: null, curso: null },
  { id_usuario: 2, nombre: "Ana", apellido1: "López", apellido2: "Sanz", telefono: "699111222", identificacion: "X2234567B", email_tutor: null, curso: null },
  { id_usuario: 3, nombre: "David", apellido1: "Martín", apellido2: "Gil", telefono: "688111222", identificacion: "X3234567C", email_tutor: null, curso: null },
  { id_usuario: 4, nombre: "Lucía", apellido1: "Hernández", apellido2: "Díaz", telefono: "677111222", identificacion: "X4234567D", email_tutor: null, curso: null },
  { id_usuario: 5, nombre: "Sergio", apellido1: "Romero", apellido2: "Cano", telefono: "666222333", identificacion: "X5234567E", email_tutor: null, curso: null },
  { id_usuario: 6, nombre: "María", apellido1: "Torres", apellido2: "Vega", telefono: "611111111", identificacion: "12345678A", email_tutor: "tutor1@mail.com", curso: "2DAW" },
  { id_usuario: 7, nombre: "Pablo", apellido1: "Santos", apellido2: "Lara", telefono: "622222222", identificacion: "22345678B", email_tutor: "tutor2@mail.com", curso: "2ASIX" },
  { id_usuario: 8, nombre: "Laura", apellido1: "Muñoz", apellido2: "Soto", telefono: "633333333", identificacion: "32345678C", email_tutor: "tutor3@mail.com", curso: "2DAM" },
  { id_usuario: 9, nombre: "Jorge", apellido1: "Navarro", apellido2: "Ortiz", telefono: "644444444", identificacion: "42345678D", email_tutor: "tutor4@mail.com", curso: "2DAW" },
  { id_usuario: 10, nombre: "Sara", apellido1: "Castro", apellido2: "León", telefono: "655555555", identificacion: "52345678E", email_tutor: "tutor5@mail.com", curso: "2ASIX" },
  { id_usuario: 11, nombre: "Elena", apellido1: "Rey", apellido2: "Molina", telefono: "666666666", identificacion: "62345678F", email_tutor: "tutor6@mail.com", curso: "2DAM" },
  { id_usuario: 12, nombre: "Mario", apellido1: "Parra", apellido2: "Nieto", telefono: "677777777", identificacion: "72345678G", email_tutor: "tutor7@mail.com", curso: "2BTO" },
  { id_usuario: 13, nombre: "Clara", apellido1: "Cruz", apellido2: "Mena", telefono: "688888888", identificacion: "82345678H", email_tutor: "tutor8@mail.com", curso: "2AF" },
  { id_usuario: 14, nombre: "Hugo", apellido1: "Duarte", apellido2: "Paz", telefono: "699999999", identificacion: "92345678J", email_tutor: "tutor9@mail.com", curso: "2ELM" },
  { id_usuario: 15, nombre: "Nerea", apellido1: "Campos", apellido2: "Rico", telefono: "600111222", identificacion: "11345678L", email_tutor: "tutor10@mail.com", curso: "2MAR" },
  { id_usuario: 16, nombre: "Adrián", apellido1: "Rey", apellido2: "Sela", telefono: "600222333", identificacion: "21345678M", email_tutor: "tutor11@mail.com", curso: "2AUT" },
  { id_usuario: 17, nombre: "Paula", apellido1: "Rivas", apellido2: "Teva", telefono: "600333444", identificacion: "31345678N", email_tutor: "tutor12@mail.com", curso: "2DAW" },
  { id_usuario: 18, nombre: "Luis", apellido1: "Zamora", apellido2: "Fdez", telefono: "600444555", identificacion: "41345678R", email_tutor: "tutor13@mail.com", curso: "2ASIX" },
  { id_usuario: 19, nombre: "Eva", apellido1: "Sanz", apellido2: "Rojo", telefono: "600555666", identificacion: "51345678P", email_tutor: "tutor14@mail.com", curso: "2DAM" },
  { id_usuario: 20, nombre: "Iker", apellido1: "García", apellido2: "Blas", telefono: "600666777", identificacion: "61345678Q", email_tutor: "tutor15@mail.com", curso: "2BTO" }
];

/**
 * @swagger
 * /perfiles:
 *   get:
 *     summary: Obtener todos los perfiles
 *     tags: [Perfiles]
 *     responses:
 *       200:
 *         description: Lista de perfiles
 */
router.get('/', (req, res) => res.json(perfiles));

/**
 * @swagger
 * /perfiles/{id_usuario}:
 *   get:
 *     summary: Obtener un perfil por ID
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *       404:
 *         description: Perfil no encontrado
 */
router.get('/:id_usuario', (req, res) => {
    const id = parseInt(req.params.id_usuario, 10);
    const perfil = perfiles.find(p => p.id_usuario === id);
    if (perfil) res.json(perfil);
    else res.status(404).json({ error: "Perfil no encontrado" });
});

/**
 * @swagger
 * /perfiles:
 *   post:
 *     summary: Crear un nuevo perfil
 *     tags: [Perfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido1:
 *                 type: string
 *               apellido2:
 *                 type: string
 *               telefono:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               email_tutor:
 *                 type: string
 *               curso:
 *                 type: string
 *             example:
 *               nombre: "Laura"
 *               apellido1: "Pérez"
 *               apellido2: "López"
 *               telefono: "600777888"
 *               identificacion: "X9999999Z"
 *               email_tutor: "tutor16@mail.com"
 *               curso: "2DAM"
 *     responses:
 *       201:
 *         description: Perfil creado
 */
router.post('/', (req, res) => {
    const { nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso } = req.body;
    if (!nombre || !apellido1 || !apellido2 || !telefono || !identificacion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const id_usuario = perfiles.length ? perfiles[perfiles.length - 1].id_usuario + 1 : 1;
    const nuevoPerfil = { id_usuario, nombre, apellido1, apellido2, telefono, identificacion, email_tutor: email_tutor || null, curso: curso || null };
    perfiles.push(nuevoPerfil);
    res.status(201).json(nuevoPerfil);
});

/**
 * @swagger
 * /perfiles/{id_usuario}:
 *   put:
 *     summary: Actualizar un perfil existente
 *     tags: [Perfiles]
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
 *               nombre:
 *                 type: string
 *               apellido1:
 *                 type: string
 *               apellido2:
 *                 type: string
 *               telefono:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               email_tutor:
 *                 type: string
 *               curso:
 *                 type: string
 *             example:
 *               nombre: "Laura"
 *               apellido1: "Pérez"
 *               apellido2: "López"
 *               telefono: "600777888"
 *               identificacion: "X9999999Z"
 *               email_tutor: "tutor16@mail.com"
 *               curso: "2DAM"
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       400:
 *         description: ID inválido o campos faltantes
 */
router.put('/:id_usuario', (req, res) => {
    const id = parseInt(req.params.id_usuario, 10);
    const { nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso } = req.body;
    const perfil = perfiles.find(p => p.id_usuario === id);
    if (!perfil || !nombre || !apellido1 || !apellido2 || !telefono || !identificacion) {
        return res.status(400).json({ error: "ID inválido o campos faltantes" });
    }

    perfil.nombre = nombre;
    perfil.apellido1 = apellido1;
    perfil.apellido2 = apellido2;
    perfil.telefono = telefono;
    perfil.identificacion = identificacion;
    perfil.email_tutor = email_tutor || null;
    perfil.curso = curso || null;

    res.json(perfil);
});

/**
 * @swagger
 * /perfiles/{id_usuario}:
 *   delete:
 *     summary: Eliminar un perfil
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil eliminado
 *       404:
 *         description: Perfil no encontrado
 */
router.delete('/:id_usuario', (req, res) => {
    const id = parseInt(req.params.id_usuario, 10);
    const index = perfiles.findIndex(p => p.id_usuario === id);
    if (index === -1) return res.status(404).json({ error: "Perfil no encontrado" });

    const eliminado = perfiles.splice(index, 1);
    res.json({ deleted: eliminado[0] });
});

module.exports = router;
