# 2. Base de Datos (SQLite)

La base de datos es el cerebro de nuestro sistema, donde guardamos quiénes se han registrado, las sesiones creadas y (a futuro) los productos y ventas. Está ubicada en la carpeta `db/`.

## Archivo `index.js` (La Conexión)
Simplemente llama a la librería `better-sqlite3` y le dice: "Crea o abre un archivo llamado `contacts.db`" (o el nombre de tu archivo de base de datos) y ponlo en modo `WAL` (que lo hace mucho más veloz para leer y escribir al mismo tiempo).

## Archivo `tables.js` (Estructura de las Tablas)
Este archivo solo se ejecuta cuando necesitamos crear todo desde cero (por ejemplo: `node db/tables.js`). Tiene código SQL puro (Structured Query Language). 

Por exigencias del código del profesor, la tabla más importante desarrollada al momento es `users`:
\`\`\`sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT 0
)
\`\`\`
1. **id**: Un número que crece solito 1, 2, 3...
2. **email**: El correo (`UNIQUE` significa que SQLite soltará un error si alguien trata de usar el mismo correo dos veces).
3. **password_hash**: Jamás se guardan claves reales como "Password123". Se aplica un algoritmo complejo que crea un texto ilegible (el hash) usando `bcrypt`. Así si hackean la DB, las contraseñas reales están seguras.
4. **email_verified**: Es un booleano (0 o 1). Mientras esté en 0, el sistema le deniega el inicio de sesión.
