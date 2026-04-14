import express from 'express';
import cors from 'cors';
import authRouter from './features/auth/auth.routes.js';
import userRouter from './features/user/user.routes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ mensaje: '¡El sistema de facturación está vivo!' });
});

// Rutas de autenticación (Login)
app.use('/api/auth', authRouter);

// Rutas de usuarios (Registro)
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`🚀 Servidor de facturación corriendo en http://localhost:${port}`);
});
