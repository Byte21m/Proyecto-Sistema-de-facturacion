# 4. Inicio de Sesión y Seguridad (Features / Auth)

Esta carpeta (`features/auth/`) aloja todo lo relacionado a la validación, inicio de sesión (Login) y confirmación de la cuenta.

## 1. La Ruta de Verificación (PATCH /verify)
Antes de siquiera dejarte logearte, si el usuario da clic en el correo, la acción aterriza aquí.
1. Se recibe el token largo cifrado del correo.
2. `jwt.verify` desencripta el texto y saca a qué usuario pertenece (ya que usamos la mismita cadena secreta usada en `user.routes`).
3. Busca al usuario y, si todo está bien, cambia la casilla `email_verified` a 1 en la base de datos (con `userRepository.updateEmailVerify()`).
¡Si el token expiró (pasó más de 1h), automáticamente Nodemailer manda OTRO correo reenviando un nuevo código y cancelando el actual! 

## 2. La Ruta de Login (POST /)
La acción más crítica, el punto de revisión.
1. Revisa Zod para ver si enviaron formato de correo y clave.
2. Descarga al usuario desde SQLite buscando su email y **supervisa si su `email_verified` está en 1**. Si no lo está, le niega la entrada.
3. Toma la clave escrita por el usuario, y la compara matemáticamente contra el hash loco que está en SQLite (`bcrypt.compare()`).
4. Si coincide, le da de premio 2 Tokens diferentes:
   - **Access Token**: Un ticket corto de 30 mins para validar si eres dueño de la cuenta. 
   - **Refresh Token**: Un gran ticket de 7 días. El sistema del profesor te crea aquí también una sesión extra en una tabla llamada `sessions` que permite prolongar tu estancia si lo guardas dentro de una Cookie (`res.cookie('refresh_token', ...)`). Así evitas tener que pedirle la contraseña todos los días.

## Conclusión
Esa intriga entre cifrado de claves en la base de datos (bcrypt) + validación de identidades in-falsificables en el lado del servidor y del cliente (JWT y correo electrónico) completan la muralla inexpugnable de tu sistema de facturación, y todo configurado tal cual los apuntes del profesor 💪.
