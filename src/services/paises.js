const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta para obtener todos los países
router.get('/', (req, res) => {
  db.query('SELECT * FROM paises ORDER BY nombre', (err, results) => {
    if (err) {
      console.error('Error al obtener países:', err);
      res.status(500).json({ error: 'Error al obtener países' });
    } else {
      res.json({ paises: results.rows });
    }
  });
});

// Ruta para obtener un país por ID
router.get('/:id', (req, res) => {
  const paisId = req.params.id;
  db.query('SELECT * FROM paises WHERE id_pais = $1', [paisId], (err, results) => {
    if (err) {
      console.error('Error al obtener el país:', err);
      res.status(500).json({ error: 'Error al obtener el país' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'País no encontrado' });
      } else {
        res.json({ pais: results.rows[0] });
      }
    }
  });
});

// Ruta para crear un país
router.post('/', (req, res) => {
  const { nombre } = req.body;
  db.query(
    'INSERT INTO paises (nombre) VALUES ($1)',
    [nombre],
    (err, results) => {
      if (err) {
        console.error('Error al crear el país:', err);
        res.status(500).json({ error: 'Error al crear el país' });
      } else {
        res.json({ message: 'País creado con éxito', pais: req.body });
      }
    }
  );
});

// Ruta para actualizar un país
router.put('/:id', (req, res) => {
  const paisId = req.params.id;
  const { nombre } = req.body;
  db.query(
    'UPDATE paises SET nombre = $1 WHERE id_pais = $2',
    [nombre, paisId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el país:', err);
        res.status(500).json({ error: 'Error al actualizar el país' });
      } else {
        res.json({ message: 'País actualizado con éxito', pais: req.body });
      }
    }
  );
});

// Ruta para eliminar un país
router.delete('/:id', (req, res) => {
  const paisId = req.params.id;
  db.query('DELETE FROM paises WHERE id_pais = $1', [paisId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el país:', err);
      res.status(500).json({ error: 'Error al eliminar el país' });
    } else {
      res.json({ message: 'País eliminado con éxito' });
    }
  });
});

module.exports = router;