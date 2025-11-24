import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'secreto_default_para_pruebas';
  return jwt.sign(payload, secret, {
    expiresIn: '15m'
  });
};

export const generateRefreshToken = (payload) => {
  const secret = process.env.JWT_REFRESH_SECRET || 'refresh_secreto_default';
  return jwt.sign(payload, secret, {
    expiresIn: '7d'
  });
};

export const verifyAccessToken = (token) => {
  const secret = process.env.JWT_SECRET || 'secreto_default_para_pruebas';
  return jwt.verify(token, secret);
};

export const verifyRefreshToken = (token) => {
  const secret = process.env.JWT_REFRESH_SECRET || 'refresh_secreto_default';
  return jwt.verify(token, secret);
};
