import { Router } from 'express';
import { createUserSchema } from './user.routes.schemas.js';
import bcrypt from 'bcrypt';
import userRepository from './user.repository.js';
import { ZodError } from 'zod';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    // 1. Validar el requerimiento usando Zod
    const body = createUserSchema.parse(req.body);

    // 2. Verificar si el usuario ya existe
    const existingUser = userRepository.findUserByUsername(body.usuario);
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // 3. Encriptar la contraseña
    const passwordHash = await bcrypt.hash(body.password, 10);

    // 4. Guardar en la base de datos a través del reporsitory
    const createdUser = userRepository.createUser({
      nombre: body.nombre,
      usuario: body.usuario,
      passwordHash,
      rol: body.rol
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: createdUser
    });

  } catch (error) {
    if (error instanceof ZodError) {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ error: errores });
    }
    
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error en el servidor al registrar el usuario' });
  }
});

export default userRouter;
