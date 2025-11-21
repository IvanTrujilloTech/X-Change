import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
//no se esta es la ruta subjetiva pero luego ya se cambiara supongo
app.use('/api/auth', authRoutes);

//tambien esta ruta se cambia pero no lo se la definitiva mateo tiene que meter mano
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

app.listen(3000, () => console.log('Server running on port 3000'));