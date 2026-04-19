# Documentación del Backend (API)

Esta carpeta contiene el backend del **Sistema de Facturación**, construido con Node.js, Express y SQLite (usando la librería `better-sqlite3`).

## Estructura de Carpetas y Archivos

### 1. Archivo Principal: `index.js`
Es el punto de entrada de la aplicación. Configura:
- El servidor de Express.
- Middlewares: `cors` (para permitir peticiones del frontend) y `express.json()` (para leer JSON).
- Agrupa y levanta las rutas principales bajo `/api/`:
  - `/api/ping`: Ruta de prueba.
  - `/api/auth`: Rutas de autenticación (Login).
  - `/api/user`: Rutas de usuario (Registro).
- Levanta el servidor en el puerto `3000`.

### 2. Base de Datos: `db/`
Esta carpeta maneja la configuración y las tablas de nuestra base de datos SQLite.
- **`index.js`**: Configura y exporta la conexión a la base de datos `database.db`. Usa `journal_mode = WAL` para mejorar el rendimiento.
- **`tables.js`**: Define y crea la estructura de las tablas que usa el proyecto (tiene una función `resetDb()` que borra todo y empieza de cero al ejecutarse). Tablas incluidas:
  - `users`: Usuarios del sistema (nombre, usuario, password en hash, rol).
  - `products`: Catálogo de productos (nombre, precio en dólares, stock).
  - `sales`: Registro cabecera de las ventas (fecha, total en Bs, usuario que vendió).
  - `sale_details`: El detalle de qué productos se vendieron en cada venta (incluye, cantidad, precio del momento y tasa del día).
  - `sessions`: Manejo de sesiones de usuario usando JWT.

### 3. Funcionalidades: `features/`
Aquí el proyecto divide las rutas y lógicas en módulos ("features").
- **`auth/`**: Contiene todo lo relacionado a iniciar sesión (comprobar contraseñas, generar y devolver un token de sesión). Su archivo principal de rutas lo carga `index.js`.
- **`user/`**: Contiene la lógica para registrar a un nuevo usuario en el sistema.

### ¿Cómo iniciar?
1. Ejecuta primero la configuración de bases de datos para asegurarte de que las tablas existan:
   \`\`\`bash
   node db/tables.js
   \`\`\`
2. Ejecuta el servidor:
   \`\`\`bash
   npm run dev
   # o node index.js
   \`\`\`
