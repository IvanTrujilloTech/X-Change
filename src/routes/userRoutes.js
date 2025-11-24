import { Router } from 'express';
import { authenticateToken } from '../middleware/tokenVerify.js';

const router = Router();

router.get('/:email', authenticateToken, (req, res) => {
  // Obtener perfil del usuario logueado
  res.json({
    user: req.user,
    message: 'Perfil del usuario'
  });
});
router.get('/:id_rol', authenticateToken, (req, res) => {
  // Obtener perfil del usuario logueado
  res.json({
    user: req.user,
    message: 'Perfil del usuario'
  });
});

router.get('/:id', authenticateToken, (req, res) => {
  // esto es lo q protegera el id de usuario etc y ira
  const userId = req.params.id;
  res.json({
    message: `Datos del usuario ${userId}`,
    requestedBy: req.user.username
  });
});
router.put('/perfiles/:id', authenticateToken, async (req, res) => {
  const userId = req.user.sub;
  const { nombre, apellido1, apellido2, telefono, curso } = req.body;
    res.json({ success: true, message: 'Perfil actualizado' });
});

router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.sub; // ID del token
    const profile = {
    id_usuario: userId,
    email: req.user.email,
    id_rol: req.user.id_rol,
    // Datos de la tabla 'perfiles':
    nombre: 'María',
    apellido1: 'García',
    apellido2: 'López',
    telefono: '123456789',
    curso: '2DAW',
    email_tutor: 'tutor@test.com'
  };
  
  res.json({ success: true, profile });
});
export default router;