import { generateToken } from '../config/jwt.js';

export const login = (req, res) => {
  const { username, password } = req.body;

  // aqui diran si el usuario y la contraseña son correctos
  if (username === 'usuario' && password === 'password') {
    const payload = { 
      sub: '12345', 
      role: 'user',
      username: username
    };
    
    const token = generateToken(payload);
    //devuelve mu bien porque significara que el usuario y la contra coincide 
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

export const getProfile = (req, res) => {
//no borrar porque esto es lo q el middelware usa para devolver el perfil y dira ok me como esta dih
  res.json({
    success: true,
    user: req.user
  });
};