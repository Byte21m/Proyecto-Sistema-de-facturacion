# 3. Registro y Envío de Correos (Features / User)

El código del profesor en `apps/api/features/user` agrupa en una carpeta todo lo que un Usuario "es y hace" cuando es nuevo.

## 1. El Esquema (user.routes.schemas.js)
Aquí se definen las reglas usando la librería `Zod`. Zod se asegura de que el texto insertado sí sea un correo, y revisa mediante un `Regex` (Expresión Regular) que la contraseña del usuario siempre tenga 8 caracteres, letras mayúsculas, minúsculas y números. Zod bloquea la orden si es mala y así ni siquiera tocamos la Base de Datos.

## 2. El Repositorio (user.repository.js)
Este archivo solo tiene una tarea: "Hablar con la Base de Datos". Los repositorios son traductores; la ruta aísla todo el SQL en el repositorio. Aquí tenemos comandos como `createUser` (que corre un `INSERT INTO users...`) y `findUserByEmail` (que corre un `SELECT * FROM users WHERE email...`).

## 3. La Ruta Principal (user.routes.js)
El corazón de la acción se da en \`userRouter.post('/', ...)\`. Cuando el cliente manda sus datos por POST:
1. **Validamos**: Enviamos el cuerpo (body) a Zod.
2. **Encriptamos**: Echamos a correr `bcrypt.hash` para generar la contraseña segura.
3. **Guardamos**: Usamos nuestro \`userRepository\` para guardar el email y el hash en SQLite. Devuelve a `createdUser`.
4. **Token de Correo**: Creamos un token secreto JWT (JSON Web Token), una cadenita de texto que adentro lleva cifrado el `id` y el `email` del nuevo pobre usuario que no sabe que se le enviará un correo, con vida útil de una hora.
5. **Nodemailer**: Llamamos a `nodemailerService.sendMail(...)`. Este servicio usa Gmail y la "contraseña de aplicación" que pusimos en `.env` para mandar un correo HTML al destino, incluyendo un enlace que, al hacerle click, enviará el "token" como pase de verificación.
6. Si algo explota (como que SQLite retorne "este correo ya existe"), borramos al usuario si se guardó por la mitad, y enviamos el Error de regreso.
