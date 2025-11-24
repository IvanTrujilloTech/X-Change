import { Router } from 'express';
import { authenticateToken } from '../middleware/tokenVerify.js';

const router = Router();

router.get('/:id_docu', authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'oferta de la empresa, aqui ira el nombre de la empresa'
  });
});

router.get('/:url_archivo', authenticateToken, (req, res) => {
  res.json({
    user: req.user,
    message: 'duracion de la oferta,puede ser 3 meses,6 meses,12 meses'
  });
});

router.get('/tipo', authenticateToken, (req, res) => {
  // Obtener perfil del usuario logueado
  res.json({
    user: req.user,
    message: 'nombre de la oferta, aqui ira el nombre de la oferta'
  });
});



export default router;