const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta para obtener todos los documentos
router.get('/', (req, res) => {
  db.query('SELECT * FROM documentos', (err, results) => {
    if (err) {
      console.error('Error al obtener documentos:', err);
      res.status(500).json({ error: 'Error al obtener documentos' });
    } else {
      res.json({ documentos: results.rows });
    }
  });
});

// Ruta para obtener documentos de un usuario
router.get('/usuario/:id_usuario', (req, res) => {
  const userId = req.params.id_usuario;
  db.query('SELECT * FROM documentos WHERE id_usuario = $1', [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener documentos del usuario:', err);
      res.status(500).json({ error: 'Error al obtener documentos del usuario' });
    } else {
      res.json({ documentos: results.rows });
    }
  });
});

// Ruta para obtener un documento por ID
router.get('/:id', (req, res) => {
  const docId = req.params.id;
  db.query('SELECT * FROM documentos WHERE id_doc = $1', [docId], (err, results) => {
    if (err) {
      console.error('Error al obtener el documento:', err);
      res.status(500).json({ error: 'Error al obtener el documento' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'Documento no encontrado' });
      } else {
        res.json({ documento: results.rows[0] });
      }
    }
  });
});

// Ruta para crear un documento
router.post('/', (req, res) => {
  const { id_usuario, tipo, url_archivo } = req.body;
  db.query(
    'INSERT INTO documentos (id_usuario, tipo, url_archivo) VALUES ($1, $2, $3)',
    [id_usuario, tipo, url_archivo],
    (err, results) => {
      if (err) {
        console.error('Error al crear el documento:', err);
        res.status(500).json({ error: 'Error al crear el documento' });
      } else {
        res.json({ message: 'Documento creado con éxito', documento: req.body });
      }
    }
  );
});

// Ruta para actualizar un documento
router.put('/:id', (req, res) => {
  const docId = req.params.id;
  const { tipo, url_archivo } = req.body;
  db.query(
    'UPDATE documentos SET tipo = $1, url_archivo = $2 WHERE id_doc = $3',
    [tipo, url_archivo, docId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el documento:', err);
        res.status(500).json({ error: 'Error al actualizar el documento' });
      } else {
        res.json({ message: 'Documento actualizado con éxito', documento: req.body });
      }
    }
  );
});

// Ruta para eliminar un documento
router.delete('/:id', (req, res) => {
  const docId = req.params.id;
  db.query('DELETE FROM documentos WHERE id_doc = $1', [docId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el documento:', err);
      res.status(500).json({ error: 'Error al eliminar el documento' });
    } else {
      res.json({ message: 'Documento eliminado con éxito' });
    }
  });
});

module.exports = router;