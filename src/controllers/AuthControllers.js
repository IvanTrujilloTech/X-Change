import { generateToken } from '../config/jwt.js';

export const login = (req, res) => {
  const { username, password } = req.body;

  // aqui diran si el usuario y la contraseña son correctos
  if (username === 'usuario' && password === 'password') {
    //esto lo definimos nosotros en plan son los datos que queremos guardar en el token
    //el sub es el id unico del usuario
    const payload = { 
      sub: '12345', 
      role: 'user',
      username: username
    };
    
    const token = generateToken(payload);
        const refreshToken = generateRefreshToken(payload);

    //devuelve mu bien porque significara que el usuario y la contra coincide 
       res.cookie('refreshToken', refreshToken, {
      httpOnly: true,    // No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'strict', // Protección contra CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });

    res.json({
      success: true,
      token: token,
      message: 'Login exitoso'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciales inválidas'
    });
  }
};

// NUEVO: Endpoint para refrescar token
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ 
      success: false,
      message: 'Refresh token missing' 
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    
    // Genera nuevo access token
    const newAccessToken = generateAccessToken({
      sub: decoded.sub,
      role: decoded.role,
      username: decoded.username
    });

    res.json({
      success: true,
      accessToken: newAccessToken
    });

  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid or expired refresh token'
    });
  }
};

// limpia la cookie y la pule como un bebe 
export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({
    success: true,
    message: 'Logout exitoso'
  });
};