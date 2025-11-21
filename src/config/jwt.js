import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: '15m'
  });
};
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d' // SIETE DIAS Q COJONESSS
  });
};
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};