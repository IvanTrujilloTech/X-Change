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

export default router;