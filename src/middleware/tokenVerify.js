import { verifyAccessToken as verifyToken } from '../config/jwt.js';
import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //este es como el formato tipico de bearer token no se porque se dice bearer token pero es asi
  //en plan eyJUQOEOhjdskkd19hdh6383j esto pero un poco mas corto
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token requerido'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido o expirado',
      error: error.message
    });
  }
};