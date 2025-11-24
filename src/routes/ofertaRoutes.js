const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ofertas
 *   description: Gestión de ofertas de prácticas o trabajos
 */

let ofertas = [
  { id_oferta: 1, nombre: "Desarrollo Web Junior", descripcion: "Prácticas en empresa de software", id_pais: 1, empresa: "TechSoft", duracion_meses: 6 },
  { id_oferta: 2, nombre: "Soporte Redes TI", descripcion: "Soporte en infraestructura de red", id_pais: 2, empresa: "NetCare", duracion_meses: 4 },
  { id_oferta: 3, nombre: "Base de Datos en compañía financiera", descripcion: "Gestión de datos bancarios", id_pais: 3, empresa: "FinBank", duracion_meses: 5 },
  { id_oferta: 4, nombre: "Ciberseguridad nivel inicial", descripcion: "Monitorización y auditoría", id_pais: 4, empresa: "SecureIT", duracion_meses: 6 },
  { id_oferta: 5, nombre: "Automatización industrial", descripcion: "Programación de PLCs", id_pais: 5, empresa: "InduTech", duracion_meses: 3 },
  { id_oferta: 6, nombre: "Administración de Sistemas Linux", descripcion: "Gestión de servidores", id_pais: 6, empresa: "ServerCorp", duracion_meses: 4 },
  { id_oferta: 7, nombre: "Desarrollo videojuegos", descripcion: "Unity y C#", id_pais: 7, empresa: "PlayDev", duracion_meses: 6 },
  { id_oferta: 8, nombre: "Robótica colaborativa", descripcion: "Brazos industriales", id_pais: 8, empresa: "MechaLabs", duracion_meses: 3 },
  { id_oferta: 9, nombre: "IoT en agricultura", descripcion: "Sensores para cultivo inteligente", id_pais: 9, empresa: "SmartAgro", duracion_meses: 6 },
  { id_oferta: 10, nombre: "Mantenimiento ferroviario", descripcion: "Sistemas de trenes", id_pais: 10, empresa: "RailWorks", duracion_meses: 5 },
  { id_oferta: 11, nombre: "Diseño UX/UI", descripcion: "Mejoras de interfaces", id_pais: 11, empresa: "DesignHouse", duracion_meses: 5 },
  { id_oferta: 12, nombre: "Marketing digital", descripcion: "Redes y posicionamiento online", id_pais: 12, empresa: "MediaBoost", duracion_meses: 3 },
  { id_oferta: 13, nombre: "Energías renovables", descripcion: "Plantaciones eólicas y solares", id_pais: 13, empresa: "GreenFuture", duracion_meses: 6 },
  { id_oferta: 14, nombre: "Logística internacional", descripcion: "Control de stock", id_pais: 14, empresa: "LogiTrans", duracion_meses: 4 },
  { id_oferta: 15, nombre: "Desarrollo móvil Android", descripcion: "Apps Kotlin", id_pais: 15, empresa: "AppMaster", duracion_meses: 6 },
  { id_oferta: 16, nombre: "Electrónica automotriz", descripcion: "Sensores de motor", id_pais: 16, empresa: "AutoLab", duracion_meses: 5 },
  { id_oferta: 17, nombre: "Impresión 3D", descripcion: "Fabricación aditiva", id_pais: 17, empresa: "PrintWorks", duracion_meses: 3 },
  { id_oferta: 18, nombre: "Cocina internacional", descripcion: "Restauración", id_pais: 18, empresa: "ChefWorld", duracion_meses: 6 },
  { id_oferta: 19, nombre: "Soldadura industrial", descripcion: "Certificación MIG/MAG", id_pais: 19, empresa: "WeldTech", duracion_meses: 4 },
  { id_oferta: 20, nombre: "Turismo en Europa", descripcion: "Agencias de viaje", id_pais: 20, empresa: "TravelPro", duracion_meses: 3 }
];

/**
 * @swagger
 * /ofertas:
 *   get:
 *     summary: Listar todas las ofertas
 *     tags: [Ofertas]
 *     responses:
 *       200:
 *         description: Lista de ofertas
 */
router.get('/', (req, res) => res.json(ofertas));

/**
 * @swagger
 * /ofertas/{id_oferta}:
 *   get:
 *     summary: Obtener oferta por ID
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id_oferta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oferta encontrada
 *       404:
 *         description: Oferta no encontrada
 */
router.get('/:id_oferta', (req, res) => {
    const id = parseInt(req.params.id_oferta, 10);
    const oferta = ofertas.find(o => o.id_oferta === id);
    if (oferta) res.json(oferta);
    else res.status(404).json({ error: "Oferta no encontrada" });
});

/**
 * @swagger
 * /ofertas:
 *   post:
 *     summary: Crear una nueva oferta
 *     tags: [Ofertas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               id_pais:
 *                 type: integer
 *               empresa:
 *                 type: string
 *               duracion_meses:
 *                 type: integer
 *             example:
 *               nombre: "Prácticas Java"
 *               descripcion: "Aprender Java en empresa tecnológica"
 *               id_pais: 1
 *               empresa: "TechCompany"
 *               duracion_meses: 6
 *     responses:
 *       201:
 *         description: Oferta creada
 */
router.post('/', (req, res) => {
    const { nombre, descripcion, id_pais, empresa, duracion_meses } = req.body;
    if (!nombre || !descripcion || !id_pais || !empresa || !duracion_meses) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const id_oferta = ofertas.length ? ofertas[ofertas.length - 1].id_oferta + 1 : 1;
    const nuevaOferta = { id_oferta, nombre, descripcion, id_pais, empresa, duracion_meses };
    ofertas.push(nuevaOferta);
    res.status(201).json(nuevaOferta);
});

/**
 * @swagger
 * /ofertas/{id_oferta}:
 *   put:
 *     summary: Actualizar una oferta existente
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id_oferta
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
 *               descripcion:
 *                 type: string
 *               id_pais:
 *                 type: integer
 *               empresa:
 *                 type: string
 *               duracion_meses:
 *                 type: integer
 *             example:
 *               nombre: "Prácticas Java"
 *               descripcion: "Aprender Java actualizado"
 *               id_pais: 1
 *               empresa: "TechCompany"
 *               duracion_meses: 6
 *     responses:
 *       200:
 *         description: Oferta actualizada
 *       400:
 *         description: ID inválido o campos faltantes
 */
router.put('/:id_oferta', (req, res) => {
    const id = parseInt(req.params.id_oferta, 10);
    const { nombre, descripcion, id_pais, empresa, duracion_meses } = req.body;
    const oferta = ofertas.find(o => o.id_oferta === id);
    if (!oferta || !nombre || !descripcion || !id_pais || !empresa || !duracion_meses) {
        return res.status(400).json({ error: "ID inválido o campos faltantes" });
    }
    oferta.nombre = nombre;
    oferta.descripcion = descripcion;
    oferta.id_pais = id_pais;
    oferta.empresa = empresa;
    oferta.duracion_meses = duracion_meses;
    res.json(oferta);
});

/**
 * @swagger
 * /ofertas/{id_oferta}:
 *   delete:
 *     summary: Eliminar una oferta
 *     tags: [Ofertas]
 *     parameters:
 *       - in: path
 *         name: id_oferta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oferta eliminada
 *       404:
 *         description: Oferta no encontrada
 */
router.delete('/:id_oferta', (req, res) => {
    const id = parseInt(req.params.id_oferta, 10);
    const index = ofertas.findIndex(o => o.id_oferta === id);
    if (index === -1) return res.status(404).json({ error: "Oferta no encontrada" });

    const eliminado = ofertas.splice(index, 1);
    res.json({ deleted: eliminado[0] });
});

module.exports = router;
