const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta para obtener todos los roles
router.get('/', (req, res) => {
  db.query('SELECT * FROM roles ORDER BY id_rol', (err, results) => {
    if (err) {
      console.error('Error al obtener roles:', err);
      res.status(500).json({ error: 'Error al obtener roles' });
    } else {
      res.json({ roles: results.rows });
    }
  });
});

// Ruta para obtener un rol por ID
router.get('/:id', (req, res) => {
  const rolId = req.params.id;
  db.query('SELECT * FROM roles WHERE id_rol = $1', [rolId], (err, results) => {
    if (err) {
      console.error('Error al obtener el rol:', err);
      res.status(500).json({ error: 'Error al obtener el rol' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'Rol no encontrado' });
      } else {
        res.json({ rol: results.rows[0] });
      }
    }
  });
});

// Ruta para crear un rol
router.post('/', (req, res) => {
  const { tipo } = req.body;
  db.query(
    'INSERT INTO roles (tipo) VALUES ($1)',
    [tipo],
    (err, results) => {
      if (err) {
        console.error('Error al crear el rol:', err);
        res.status(500).json({ error: 'Error al crear el rol' });
      } else {
        res.json({ message: 'Rol creado con éxito', rol: req.body });
      }
    }
  );
});

// Ruta para actualizar un rol
router.put('/:id', (req, res) => {
  const rolId = req.params.id;
  const { tipo } = req.body;
  db.query(
    'UPDATE roles SET tipo = $1 WHERE id_rol = $2',
    [tipo, rolId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el rol:', err);
        res.status(500).json({ error: 'Error al actualizar el rol' });
      } else {
        res.json({ message: 'Rol actualizado con éxito', rol: req.body });
      }
    }
  );
});

// Ruta para eliminar un rol
router.delete('/:id', (req, res) => {
  const rolId = req.params.id;
  db.query('DELETE FROM roles WHERE id_rol = $1', [rolId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el rol:', err);
      res.status(500).json({ error: 'Error al eliminar el rol' });
    } else {
      res.json({ message: 'Rol eliminado con éxito' });
    }
  });
});

module.exports = router;