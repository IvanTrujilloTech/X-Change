import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3000');
  console.log('📝 Endpoints disponibles:');
  console.log('   GET  /api/auth/test-generate');
  console.log('   POST /api/auth/test-verify');
  console.log('   GET  /api/auth/test-protected');
  console.log('   GET  /api/users/profile');
  console.log('   GET  /api/users/:id');
});