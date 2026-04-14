import { z } from 'zod';

export const createUserSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  usuario: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.enum(['Administrador', 'Vendedor']),
});
