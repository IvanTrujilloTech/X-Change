const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta para obtener todas las ofertas
router.get('/', (req, res) => {
  db.query('SELECT * FROM ofertas', (err, results) => {
    if (err) {
      console.error('Error al obtener ofertas:', err);
      res.status(500).json({ error: 'Error al obtener ofertas' });
    } else {
      res.json({ ofertas: results.rows });
    }
  });
});

// Ruta para obtener ofertas con información de país
router.get('/completo', (req, res) => {
  db.query(`
    SELECT o.*, p.nombre as pais_nombre 
    FROM ofertas o 
    JOIN paises p ON o.id_pais = p.id_pais 
    ORDER BY o.id_oferta
  `, (err, results) => {
    if (err) {
      console.error('Error al obtener ofertas completas:', err);
      res.status(500).json({ error: 'Error al obtener ofertas completas' });
    } else {
      res.json({ ofertas: results.rows });
    }
  });
});

// Ruta para obtener una oferta por ID
router.get('/:id', (req, res) => {
  const ofertaId = req.params.id;
  db.query('SELECT * FROM ofertas WHERE id_oferta = $1', [ofertaId], (err, results) => {
    if (err) {
      console.error('Error al obtener la oferta:', err);
      res.status(500).json({ error: 'Error al obtener la oferta' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'Oferta no encontrada' });
      } else {
        res.json({ oferta: results.rows[0] });
      }
    }
  });
});

// Ruta para crear una oferta
router.post('/', (req, res) => {
  const { nombre, description, id_pais, empresa, duracion_meses } = req.body;
  db.query(
    'INSERT INTO ofertas (nombre, description, id_pais, empresa, duracion_meses) VALUES ($1, $2, $3, $4, $5)',
    [nombre, description, id_pais, empresa, duracion_meses],
    (err, results) => {
      if (err) {
        console.error('Error al crear la oferta:', err);
        res.status(500).json({ error: 'Error al crear la oferta' });
      } else {
        res.json({ message: 'Oferta creada con éxito', oferta: req.body });
      }
    }
  );
});

// Ruta para actualizar una oferta
router.put('/:id', (req, res) => {
  const ofertaId = req.params.id;
  const { nombre, description, id_pais, empresa, duracion_meses } = req.body;
  db.query(
    'UPDATE ofertas SET nombre = $1, description = $2, id_pais = $3, empresa = $4, duracion_meses = $5 WHERE id_oferta = $6',
    [nombre, description, id_pais, empresa, duracion_meses, ofertaId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar la oferta:', err);
        res.status(500).json({ error: 'Error al actualizar la oferta' });
      } else {
        res.json({ message: 'Oferta actualizada con éxito', oferta: req.body });
      }
    }
  );
});

// Ruta para eliminar una oferta
router.delete('/:id', (req, res) => {
  const ofertaId = req.params.id;
  db.query('DELETE FROM ofertas WHERE id_oferta = $1', [ofertaId], (err, results) => {
    if (err) {
      console.error('Error al eliminar la oferta:', err);
      res.status(500).json({ error: 'Error al eliminar la oferta' });
    } else {
      res.json({ message: 'Oferta eliminada con éxito' });
    }
  });
});

module.exports = router;