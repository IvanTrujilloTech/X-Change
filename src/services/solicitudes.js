const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta para obtener todas las solicitudes
router.get('/', (req, res) => {
  db.query('SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC', (err, results) => {
    if (err) {
      console.error('Error al obtener solicitudes:', err);
      res.status(500).json({ error: 'Error al obtener solicitudes' });
    } else {
      res.json({ solicitudes: results.rows });
    }
  });
});

// Ruta para obtener solicitudes completas con información de usuario y oferta
router.get('/completo', (req, res) => {
  db.query(`
    SELECT s.*, u.email, o.nombre as oferta_nombre, p.nombre as pais_nombre
    FROM solicitudes s
    JOIN usuarios u ON s.id_usuario = u.id_usuario
    JOIN ofertas o ON s.id_oferta = o.id_oferta
    JOIN paises p ON o.id_pais = p.id_pais
    ORDER BY s.fecha_solicitud DESC
  `, (err, results) => {
    if (err) {
      console.error('Error al obtener solicitudes completas:', err);
      res.status(500).json({ error: 'Error al obtener solicitudes completas' });
    } else {
      res.json({ solicitudes: results.rows });
    }
  });
});

// Ruta para obtener una solicitud por ID
router.get('/:id', (req, res) => {
  const solicitudId = req.params.id;
  db.query('SELECT * FROM solicitudes WHERE id_solicitud = $1', [solicitudId], (err, results) => {
    if (err) {
      console.error('Error al obtener la solicitud:', err);
      res.status(500).json({ error: 'Error al obtener la solicitud' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'Solicitud no encontrada' });
      } else {
        res.json({ solicitud: results.rows[0] });
      }
    }
  });
});

// Ruta para obtener solicitudes de un usuario
router.get('/usuario/:id_usuario', (req, res) => {
  const userId = req.params.id_usuario;
  db.query(`
    SELECT s.*, o.nombre as oferta_nombre, p.nombre as pais_nombre
    FROM solicitudes s
    JOIN ofertas o ON s.id_oferta = o.id_oferta
    JOIN paises p ON o.id_pais = p.id_pais
    WHERE s.id_usuario = $1
    ORDER BY s.fecha_solicitud DESC
  `, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener solicitudes del usuario:', err);
      res.status(500).json({ error: 'Error al obtener solicitudes del usuario' });
    } else {
      res.json({ solicitudes: results.rows });
    }
  });
});

// Ruta para crear una solicitud
router.post('/', (req, res) => {
  const { id_usuario, id_oferta } = req.body;
  db.query(
    'INSERT INTO solicitudes (id_usuario, id_oferta) VALUES ($1, $2)',
    [id_usuario, id_oferta],
    (err, results) => {
      if (err) {
        console.error('Error al crear la solicitud:', err);
        res.status(500).json({ error: 'Error al crear la solicitud' });
      } else {
        res.json({ message: 'Solicitud creada con éxito', solicitud: req.body });
      }
    }
  );
});

// Ruta para actualizar el estado de una solicitud
router.put('/:id/estado', (req, res) => {
  const solicitudId = req.params.id;
  const { estado } = req.body;
  db.query(
    'UPDATE solicitudes SET estado = $1 WHERE id_solicitud = $2',
    [estado, solicitudId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el estado de la solicitud:', err);
        res.status(500).json({ error: 'Error al actualizar el estado de la solicitud' });
      } else {
        res.json({ message: 'Estado de solicitud actualizado con éxito', estado: estado });
      }
    }
  );
});

// Ruta para eliminar una solicitud
router.delete('/:id', (req, res) => {
  const solicitudId = req.params.id;
  db.query('DELETE FROM solicitudes WHERE id_solicitud = $1', [solicitudId], (err, results) => {
    if (err) {
      console.error('Error al eliminar la solicitud:', err);
      res.status(500).json({ error: 'Error al eliminar la solicitud' });
    } else {
      res.json({ message: 'Solicitud eliminada con éxito' });
    }
  });
});

module.exports = router;