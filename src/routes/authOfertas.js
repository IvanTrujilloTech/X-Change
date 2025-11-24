import { Router } from 'express';
import { authenticateToken } from '../middleware/tokenVerify.js';

const router = Router();

router.get('/:empresa', authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'oferta de la empresa, aqui ira el nombre de la empresa'
  });
});

router.get('/:duracion_meses', authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'duracion de la oferta,puede ser 3 meses,6 meses,12 meses'
  });
});

router.get('/nombre', authenticateToken, (req, res) => {
  // Obtener perfil del usuario logueado
  res.json({
    user: req.user,
    message: 'nombre de la oferta, aqui ira el nombre de la oferta'
  });
});

router.get('/oferta/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `Datos de la oferta ${userId}`,
    requestedBy: req.user.username
  });
});

export default router;