import { Router } from 'express';
import { logInSchema } from './auth.routes.schemas.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../user/user.repository.js';
import authRepository from './auth.repository.js';
import crypto from 'node:crypto';
import { ZodError } from 'zod';

const authRouter = Router();

authRouter.post('/', async (req, res) => {
  try {
    // 1. Validamos la data recibida
    const body = logInSchema.parse(req.body);

    // 2. Buscar el posible usuario en la base de datos
    const user = userRepository.findUserByUsername(body.usuario);

    if (!user) {
      return res.status(403).json({ error: 'Usuario o contraseña invalida' });
    }

    // 3. Comprobar la contraseña
    const isPasswordCorrect = await bcrypt.compare(body.password, user.password_hash);

    if (!isPasswordCorrect) {
      return res.status(403).json({ error: 'Usuario o contraseña invalida' });
    }

    // 4. Crear token de acceso
    const accessToken = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      'CLAVE_SECRETA_ACCESS_TOKEN', // Idealmente en variables de entorno .env
      { expiresIn: '30m' }
    );

    // 5. Crear token de refresco (sesion)
    const refreshTokenId = crypto.randomUUID();

    const refreshToken = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      'CLAVE_SECRETA_REFRESH_TOKEN', // Idealmente en variables de entorno .env
      { expiresIn: '7d', jwtid: refreshTokenId }
    );

    authRepository.createSession({ jwtid: refreshTokenId, userId: user.id });

    // Guardar refresh token en cookie (opcional para seguridad extra como el profe)
    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    
    res.cookie('refresh_token', refreshToken, {
      expires: expireDate,
      httpOnly: true,
      secure: false, // development mode
      sameSite: 'strict',
      path: '/api/refresh',
    });

    return res.status(200).json({ accessToken, userId: user.id, usuario: user.usuario, rol: user.rol });

  } catch (error) {
    if (error instanceof ZodError) {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ error: errores });
    }
    
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Ocurrió un error interno en el servidor' });
  }
});

export default authRouter;
