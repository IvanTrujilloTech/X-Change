const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documentos
 *   description: Archivos subidos por los usuarios
 */

let documentos = [
  { id_doc: 1, id_usuario: 6, tipo: "CV", url_archivo: "cv_alumno6.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 2, id_usuario: 7, tipo: "CV", url_archivo: "cv_alumno7.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 3, id_usuario: 8, tipo: "Carta de motivación", url_archivo: "carta8.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 4, id_usuario: 9, tipo: "Pasaporte", url_archivo: "pasaporte9.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 5, id_usuario: 10, tipo: "Carta de motivación", url_archivo: "carta10.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 6, id_usuario: 11, tipo: "CV", url_archivo: "cv11.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 7, id_usuario: 12, tipo: "Pasaporte", url_archivo: "pass12.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 8, id_usuario: 13, tipo: "Certificado de notas", url_archivo: "cert13.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 9, id_usuario: 14, tipo: "Pasaporte", url_archivo: "pass14.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 10, id_usuario: 15, tipo: "CV", url_archivo: "cv15.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 11, id_usuario: 16, tipo: "Carta de motivación", url_archivo: "carta16.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 12, id_usuario: 17, tipo: "CV", url_archivo: "cv17.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 13, id_usuario: 18, tipo: "Seguro médico", url_archivo: "seg18.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 14, id_usuario: 19, tipo: "CV", url_archivo: "cv19.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 15, id_usuario: 20, tipo: "Pasaporte", url_archivo: "pass20.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 16, id_usuario: 8, tipo: "Seguro médico", url_archivo: "seg8.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 17, id_usuario: 10, tipo: "Seguro médico", url_archivo: "seg10.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 18, id_usuario: 12, tipo: "CV", url_archivo: "cv12.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" },
  { id_doc: 19, id_usuario: 14, tipo: "Carta de recomendación", url_archivo: "rec14.pdf", fecha_upload: "2025-10-26T20:35:39.384Z" }
];

/**
 * @swagger
 * /documentos:
 *   get:
 *     summary: Obtener todos los documentos
 *     tags: [Documentos]
 *     responses:
 *       200:
 *         description: Lista de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_doc:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *                   url_archivo:
 *                     type: string
 *                   fecha_upload:
 *                     type: string
 *                     format: date-time
 */
router.get('/', (req, res) => res.json(documentos));

/**
 * @swagger
 * /documentos/{id_doc}:
 *   get:
 *     summary: Obtener un documento por ID
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id_doc
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: Documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               id_doc: 1
 *               id_usuario: 6
 *               tipo: "CV"
 *               url_archivo: "cv_alumno6.pdf"
 *               fecha_upload: "2025-10-26T20:35:39.384Z"
 *       404:
 *         description: Documento no encontrado
 */
router.get('/:id_doc', (req, res) => {
    const id = parseInt(req.params.id_doc, 10);
    const doc = documentos.find(d => d.id_doc === id);
    if (doc) res.json(doc);
    else res.status(404).json({ error: "Documento no encontrado" });
});

/**
 * @swagger
 * /documentos:
 *   post:
 *     summary: Subir un nuevo documento
 *     tags: [Documentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               url_archivo:
 *                 type: string
 *             example:
 *               id_usuario: 21
 *               tipo: "CV"
 *               url_archivo: "cv21.pdf"
 *     responses:
 *       201:
 *         description: Documento creado
 */
router.post('/', (req, res) => {
    const { id_usuario, tipo, url_archivo } = req.body;
    if (!id_usuario || !tipo || !url_archivo) return res.status(400).json({ error: "Faltan campos obligatorios" });

    const id_doc = documentos.length ? documentos[documentos.length - 1].id_doc + 1 : 1;
    const fecha_upload = new Date().toISOString();
    const nuevoDoc = { id_doc, id_usuario, tipo, url_archivo, fecha_upload };
    documentos.push(nuevoDoc);
    res.status(201).json(nuevoDoc);
});

/**
 * @swagger
 * /documentos/{id_doc}:
 *   put:
 *     summary: Actualizar un documento existente
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id_doc
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
 *               tipo:
 *                 type: string
 *               url_archivo:
 *                 type: string
 *             example:
 *               tipo: "CV"
 *               url_archivo: "cv_actualizado.pdf"
 *     responses:
 *       200:
 *         description: Documento actualizado
 *       400:
 *         description: ID inválido o campos faltantes
 */
router.put('/:id_doc', (req, res) => {
    const id = parseInt(req.params.id_doc, 10);
    const { tipo, url_archivo } = req.body;
    const doc = documentos.find(d => d.id_doc === id);
    if (!doc || !tipo || !url_archivo) return res.status(400).json({ error: "ID inválido o campos faltantes" });

    doc.tipo = tipo;
    doc.url_archivo = url_archivo;
    res.json(doc);
});

/**
 * @swagger
 * /documentos/{id_doc}:
 *   delete:
 *     summary: Eliminar un documento
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id_doc
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Documento eliminado
 *       404:
 *         description: Documento no encontrado
 */
router.delete('/:id_doc', (req, res) => {
    const id = parseInt(req.params.id_doc, 10);
    const index = documentos.findIndex(d => d.id_doc === id);
    if (index === -1) return res.status(404).json({ error: "Documento no encontrado" });

    const eliminado = documentos.splice(index, 1);
    res.json({ deleted: eliminado[0] });
});

module.exports = router;
