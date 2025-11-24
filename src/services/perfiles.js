const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta para obtener todos los perfiles
router.get('/', (req, res) => {
  db.query('SELECT * FROM perfiles', (err, results) => {
    if (err) {
      console.error('Error al obtener perfiles:', err);
      res.status(500).json({ error: 'Error al obtener perfiles' });
    } else {
      res.json({ perfiles: results.rows });
    }
  });
});

// Ruta para obtener perfil de un usuario
router.get('/usuario/:id_usuario', (req, res) => {
  const userId = req.params.id_usuario;
  db.query('SELECT * FROM perfiles WHERE id_usuario = $1', [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener el perfil:', err);
      res.status(500).json({ error: 'Error al obtener el perfil' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'Perfil no encontrado' });
      } else {
        res.json({ perfil: results.rows[0] });
      }
    }
  });
});

// Ruta para obtener perfil completo con información de usuario
router.get('/completo/:id_usuario', (req, res) => {
  const userId = req.params.id_usuario;
  db.query(`
    SELECT p.*, u.email, u.id_rol, r.tipo as rol
    FROM perfiles p 
    JOIN usuarios u ON p.id_usuario = u.id_usuario
    JOIN roles r ON u.id_rol = r.id_rol
    WHERE p.id_usuario = $1
  `, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener el perfil completo:', err);
      res.status(500).json({ error: 'Error al obtener el perfil completo' });
    } else {
      if (results.rows.length === 0) {
        res.status(404).json({ message: 'Perfil no encontrado' });
      } else {
        res.json({ perfil: results.rows[0] });
      }
    }
  });
});

// Ruta para crear un perfil
router.post('/', (req, res) => {
  const { id_usuario, nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso } = req.body;
  db.query(
    `INSERT INTO perfiles (id_usuario, nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id_usuario, nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso],
    (err, results) => {
      if (err) {
        console.error('Error al crear el perfil:', err);
        res.status(500).json({ error: 'Error al crear el perfil' });
      } else {
        res.json({ message: 'Perfil creado con éxito', perfil: req.body });
      }
    }
  );
});

// Ruta para actualizar un perfil
router.put('/usuario/:id_usuario', (req, res) => {
  const userId = req.params.id_usuario;
  const { nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso } = req.body;
  db.query(
    `UPDATE perfiles 
     SET nombre = $1, apellido1 = $2, apellido2 = $3, telefono = $4, 
         identificacion = $5, email_tutor = $6, curso = $7 
     WHERE id_usuario = $8`,
    [nombre, apellido1, apellido2, telefono, identificacion, email_tutor, curso, userId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el perfil:', err);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
      } else {
        res.json({ message: 'Perfil actualizado con éxito', perfil: req.body });
      }
    }
  );
});

// Ruta para eliminar un perfil
router.delete('/usuario/:id_usuario', (req, res) => {
  const userId = req.params.id_usuario;
  db.query('DELETE FROM perfiles WHERE id_usuario = $1', [userId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el perfil:', err);
      res.status(500).json({ error: 'Error al eliminar el perfil' });
    } else {
      res.json({ message: 'Perfil eliminado con éxito' });
    }
  });
});

module.exports = router;