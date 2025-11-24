const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Solicitudes
 *   description: Peticiones de los usuarios a ofertas
 */

let solicitudes = [
  { id_solicitud: 21, id_usuario: 6, id_oferta: 1, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 22, id_usuario: 7, id_oferta: 2, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 23, id_usuario: 8, id_oferta: 3, estado: "aprobado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 24, id_usuario: 9, id_oferta: 4, estado: "rechazado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 25, id_usuario: 10, id_oferta: 5, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 26, id_usuario: 11, id_oferta: 6, estado: "aprobado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 27, id_usuario: 12, id_oferta: 7, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 28, id_usuario: 13, id_oferta: 8, estado: "aprobado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 29, id_usuario: 14, id_oferta: 9, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 30, id_usuario: 15, id_oferta: 10, estado: "rechazado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 31, id_usuario: 16, id_oferta: 11, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 32, id_usuario: 17, id_oferta: 12, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 33, id_usuario: 18, id_oferta: 13, estado: "aprobado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 34, id_usuario: 19, id_oferta: 14, estado: "rechazado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 35, id_usuario: 20, id_oferta: 15, estado: "aprobado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 36, id_usuario: 7, id_oferta: 17, estado: "rechazado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 37, id_usuario: 8, id_oferta: 18, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 38, id_usuario: 9, id_oferta: 19, estado: "aprobado", fecha_solicitud: "2025-10-26T20:35:08.989Z" },
  { id_solicitud: 39, id_usuario: 10, id_oferta: 20, estado: "pendiente", fecha_solicitud: "2025-10-26T20:35:08.989Z" }
];

/**
 * @swagger
 * /solicitudes:
 *   get:
 *     summary: Obtener todas las solicitudes
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 */
router.get('/', (req, res) => res.json(solicitudes));

/**
 * @swagger
 * /solicitudes/{id_solicitud}:
 *   get:
 *     summary: Obtener una solicitud por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id_solicitud
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Solicitud encontrada
 *       404:
 *         description: Solicitud no encontrada
 */
router.get('/:id_solicitud', (req, res) => {
    const id = parseInt(req.params.id_solicitud, 10);
    const solicitud = solicitudes.find(s => s.id_solicitud === id);
    if (solicitud) res.json(solicitud);
    else res.status(404).json({ error: "Solicitud no encontrada" });
});

/**
 * @swagger
 * /solicitudes:
 *   post:
 *     summary: Crear una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_oferta:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [pendiente, aprobado, rechazado]
 *             example:
 *               id_usuario: 6
 *               id_oferta: 1
 *               estado: "pendiente"
 *     responses:
 *       201:
 *         description: Solicitud creada
 */
router.post('/', (req, res) => {
    const { id_usuario, id_oferta, estado } = req.body;
    if (!id_usuario || !id_oferta || !estado) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const id_solicitud = solicitudes.length ? solicitudes[solicitudes.length - 1].id_solicitud + 1 : 1;
    const fecha_solicitud = new Date().toISOString();
    const nuevaSolicitud = { id_solicitud, id_usuario, id_oferta, estado, fecha_solicitud };
    solicitudes.push(nuevaSolicitud);
    res.status(201).json(nuevaSolicitud);
});

/**
 * @swagger
 * /solicitudes/{id_solicitud}:
 *   put:
 *     summary: Actualizar una solicitud existente
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id_solicitud
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
 *               id_usuario:
 *                 type: integer
 *               id_oferta:
 *                 type: integer
 *               estado:
 *                 type: string
 *                 enum: [pendiente, aprobado, rechazado]
 *     responses:
 *       200:
 *         description: Solicitud actualizada
 *       400:
 *         description: ID inválido o campos faltantes
 */
router.put('/:id_solicitud', (req, res) => {
    const id = parseInt(req.params.id_solicitud, 10);
    const { id_usuario, id_oferta, estado } = req.body;
    const solicitud = solicitudes.find(s => s.id_solicitud === id);
    if (!solicitud || !id_usuario || !id_oferta || !estado) {
        return res.status(400).json({ error: "ID inválido o campos faltantes" });
    }

    solicitud.id_usuario = id_usuario;
    solicitud.id_oferta = id_oferta;
    solicitud.estado = estado;

    res.json(solicitud);
});

/**
 * @swagger
 * /solicitudes/{id_solicitud}:
 *   delete:
 *     summary: Eliminar una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id_solicitud
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Solicitud eliminada
 *       404:
 *         description: Solicitud no encontrada
 */
router.delete('/:id_solicitud', (req, res) => {
    const id = parseInt(req.params.id_solicitud, 10);
    const index = solicitudes.findIndex(s => s.id_solicitud === id);
    if (index === -1) return res.status(404).json({ error: "Solicitud no encontrada" });

    const eliminado = solicitudes.splice(index, 1);
    res.json({ deleted: eliminado[0] });
});

module.exports = router;
