import { Router } from 'express';
import { generateAccessToken, verifyAccessToken } from '../config/jwt.js';
import { authenticateToken } from '../middleware/tokenVerify.js';

const router = Router();

router.get('/test-generate', (req, res) => {
  const payload = {
    sub: 'user_test_123',
    role: 'admin', 
    username: 'test_user'
  };

  const token = generateAccessToken(payload);
  
  res.json({
    message: 'Token generado para pruebas',
    token: token,
    payload: payload
  });
});

router.post('/test-verify', (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token requerido' });
    }

    const decoded = verifyAccessToken(token);
    res.json({
      message: 'Token VÁLIDO',
      decoded: decoded
    });
  } catch (error) {
    res.status(401).json({
      error: 'Token INVÁLIDO',
      message: error.message
    });
  }
});

router.get('/test-protected', authenticateToken, (req, res) => {
  res.json({
    message: '¡Acceso concedido a ruta protegida!',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

export default router;