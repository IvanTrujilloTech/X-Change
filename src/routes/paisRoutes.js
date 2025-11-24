const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Países
 *   description: Países donde se ofrecen prácticas
 */

let paises = [
  { id_pais: 1, nombre: "Eslovenia" },
  { id_pais: 2, nombre: "Croacia" },
  { id_pais: 3, nombre: "Rumania" },
  { id_pais: 4, nombre: "Bulgaria" },
  { id_pais: 5, nombre: "República Checa" },
  { id_pais: 6, nombre: "Hungría" },
  { id_pais: 7, nombre: "Austria" },
  { id_pais: 8, nombre: "Dinamarca" },
  { id_pais: 9, nombre: "Finlandia" },
  { id_pais: 10, nombre: "Suecia" },
  { id_pais: 11, nombre: "Irlanda" },
  { id_pais: 12, nombre: "Grecia" },
  { id_pais: 13, nombre: "Polonia" },
  { id_pais: 14, nombre: "Países Bajos" },
  { id_pais: 15, nombre: "Bélgica" },
  { id_pais: 16, nombre: "Alemania" },
  { id_pais: 17, nombre: "Francia" },
  { id_pais: 18, nombre: "Portugal" },
  { id_pais: 19, nombre: "Italia" },
  { id_pais: 20, nombre: "España" }
];

/**
 * @swagger
 * /paises:
 *   get:
 *     summary: Obtener todos los países
 *     tags: [Países]
 *     responses:
 *       200:
 *         description: Lista de países
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_pais:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *             example:
 *               - id_pais: 1
 *                 nombre: "Eslovenia"
 *               - id_pais: 2
 *                 nombre: "Croacia"
 */
router.get('/', (req, res) => res.json(paises));

/**
 * @swagger
 * /paises/{id_pais}:
 *   get:
 *     summary: Obtener un país por ID
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id_pais
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del país
 *     responses:
 *       200:
 *         description: País encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_pais:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *             example:
 *               id_pais: 1
 *               nombre: "Eslovenia"
 *       404:
 *         description: País no encontrado
 */
router.get('/:id_pais', (req, res) => {
    const id = parseInt(req.params.id_pais, 10);
    const pais = paises.find(p => p.id_pais === id);
    if (pais) res.json(pais);
    else res.status(404).json({ error: "País no encontrado" });
});

/**
 * @swagger
 * /paises:
 *   post:
 *     summary: Crear un nuevo país
 *     tags: [Países]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *             example:
 *               nombre: "Noruega"
 *     responses:
 *       201:
 *         description: País creado
 */
router.post('/', (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: "Se requiere el nombre del país" });

    const id_pais = paises.length ? paises[paises.length - 1].id_pais + 1 : 1;
    const nuevoPais = { id_pais, nombre };
    paises.push(nuevoPais);
    res.status(201).json(nuevoPais);
});

/**
 * @swagger
 * /paises/{id_pais}:
 *   put:
 *     summary: Actualizar un país existente
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id_pais
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
 *             example:
 *               nombre: "Noruega"
 *     responses:
 *       200:
 *         description: País actualizado
 *       400:
 *         description: ID inválido o nombre faltante
 */
router.put('/:id_pais', (req, res) => {
    const id = parseInt(req.params.id_pais, 10);
    const { nombre } = req.body;
    const pais = paises.find(p => p.id_pais === id);
    if (!pais || !nombre) return res.status(400).json({ error: "ID inválido o nombre faltante" });
    pais.nombre = nombre;
    res.json(pais);
});

/**
 * @swagger
 * /paises/{id_pais}:
 *   delete:
 *     summary: Eliminar un país
 *     tags: [Países]
 *     parameters:
 *       - in: path
 *         name: id_pais
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País eliminado
 *       404:
 *         description: País no encontrado
 */
router.delete('/:id_pais', (req, res) => {
    const id = parseInt(req.params.id_pais, 10);
    const index = paises.findIndex(p => p.id_pais === id);
    if (index === -1) return res.status(404).json({ error: "País no encontrado" });

    const eliminado = paises.splice(index, 1);
    res.json({ deleted: eliminado[0] });
});

module.exports = router;
