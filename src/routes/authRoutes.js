import { Router } from 'express';
import { login, getProfile } from '../controllers/AuthController.js';
import { authenticateToken } from '../middleware/tokenVerify.js';

const router = Router();

router.post('/login', login);
router.post('/refresh', refreshToken); 
router.post('/logout', logout);
router.get('/profile', authenticateToken, getProfile);

export default router;