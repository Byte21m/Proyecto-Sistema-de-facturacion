# 1. Introducción al Backend del Sistema de Facturación

Esta documentación está diseñada para que puedas estudiar y entender paso a paso cómo está construido el backend (la parte lógica que no se ve) de tu aplicación de facturación, basándonos exactamente en la arquitectura y código de tu profesor.

## ¿Qué es esto?
Este proyecto es una **API** (Interfaz de Programación de Aplicaciones). Actúa como un mesero: recibe las órdenes del cliente (el Frontend), busca las cosas en la cocina (Base de Datos), y se lo entrega de vuelta.

Las herramientas principales que estamos usando son:
* **Node.js**: Nuestro entorno de ejecución, es como el motor que mueve nuestra aplicación usando Javascript del lado del servidor.
* **Express.js**: Una librería que hace súper fácil crear "Rutas" o URLs (ej. \`/api/user\`) para recibir las peticiones de los navegadores o teléfonos.
* **SQLite (better-sqlite3)**: Nuestra base de datos. Es súper ligera porque en lugar de requerir un programa pesado instalado, guarda todo en un simple archivo en nuestra computadora.
* **Zod**: Nuestro policía de validaciones. Verifica que antes de guardar un usuario, su correo sea válido y tenga los 8 caracteres.
* **Nodemailer**: El "cartero". Se conecta a tu cuenta de Gmail para enviar correos electrónicos de forma automática.
* **JWT (JSON Web Tokens)**: Nuestra llave mágica de seguridad. Es lo que usamos para saber que la persona que entra es realmente quién dice ser sin pedirle la clave todo el tiempo.

## ¿Cómo funciona el archivo principal (`index.js`)?
En `index.js`, encendemos el servidor. Aquí le decimos a Express que:
1. Analice la información usando `express.json()`.
2. Habilite las galletas (`cookieParser()`) para la seguridad de sesión del profesor.
3. Asigne subcarpetas o "Rutas" (ej. "Todo lo que empiece con `/api/auth` dáselo al enrutador de Auth").
4. Finalmente, al final del archivo, atrape **cualquier error** (como los de Zod o los de la base de datos) y responda amigablemente con código 400 o 500 para que el servidor no se caiga ni se congele.
