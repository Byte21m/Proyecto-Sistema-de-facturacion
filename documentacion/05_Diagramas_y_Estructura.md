# 5. Diagramas y Estructura Organizativa

A veces es mucho más fácil estudiar un código si lo vemos visualmente en vez de leer líneas completas. A continuación tienes el panorama visual de qué es lo que hace tu aplicación basándonos en la estructura de tu profesor.

## 1. Organización de Carpetas (La Arquitectura)
Tu proyecto se rige por un esquema de "módulos de características" (features). Todo está concentrado dentro de carpetas independientes para no mezclar lógicas. Así está la radiografía:

```text
sistema-facturacion/
├── apps/
│   ├── api/  (Tu Servidor / Backend actual)
│   │   ├── db/
│   │   │   ├── index.js              # Conexión para tu base "contacts.db"
│   │   │   └── tables.js             # Aquí definiste SQLite (CREATE TABLE)
│   │   ├── features/
│   │   │   ├── auth/                 # Todo para Iniciar Sesión (Rutas, Middlewares, SQL)
│   │   │   └── user/                 # Todo para el Registro de nuevos sujetos
│   │   ├── services/
│   │   │   └── nodemailer.js         # Archivo del correo, se conecta con Gmail
│   │   ├── .env                      # 🤫 Claves secretas de tokens y correo
│   │   ├── index.js                  # El motor. Es la app principal corriendo en puerto 3000
│   │   ├── package.json              # El listado de dependencias (express, bcrypt, zod...)
│   │   └── test.http                 # Tu archivo vital para hacer pruebas manuales
│   └── client/                       # (La interfaz de usuario visual va a desarrollarse aquí)
└── documentacion/                    # ¡Carpeta para tu lectura y repaso de estudio!
```

---

## 2. Diagrama de la Base de Datos (Relaciones)
Actualmente nuestra base de datos (ER Diagram) trabaja con estas entidades del profesor que se complementan por sus llaves foráneas (`FK`):

```mermaid
erDiagram
    USERS ||--o{ SESSIONS : "posee muchas"
    USERS {
        int id PK "Llave principal"
        string email UK "Único en DB"
        string password_hash 
        boolean email_verified "0 = Inactivo, 1 = Activo"
    }
    SESSIONS {
        int id PK 
        string jwtid UK "ID único de la sesión"
        int user_id FK "Corresponde con el dueño de cuenta"
    }
```
*(Tengamos en cuenta que cuando agreguemos productos y ventas, la tabla USERS heredará mucha más responsabilidad).*

---

## 3. Diagrama de Flujo: Creación de Cuenta y Verificación
Si te confunden las validaciones al registrarte, así es como tu computadora toma sus decisiones en `features/user/user.routes.js`:

```mermaid
flowchart TD
    A[Cliente manda correo y clave a: POST /api/user] --> B{Pasa filtro Zod?}
    B -- No! Mala clave o correo --> C[Devuelve 400 Bad Request]
    B -- Todo correcto! --> D[Encripta el password con BCRYPT]
    D --> E[Lo guarda limpio en Database asumiendo un Verified = 0]
    E --> F[Firma una cadena de Token con 1 hr de de duración]
    F --> G[Nodemailer entra y echa a volar el correo]
    G --> H[Terminamos tu Status 201 en VSCode]
    
    H --> I[El propio Cliente abre su Email horas o mins después]
    I --> J[Da Clic y manda su PATCH al Server]
    J --> K{Se revisa el Token enviado}
    K -- Está Expirado --> L[Se envía automáticamente UN NUEVO CORREO mágico]
    K -- Correcto --> M[Actualiza la DB db user email_verified a 1]
    M --> N[Responde en el frontend: ¡Cuenta Verificada con éxito!]
```

---

## 4. Diagrama de Flujo: Iniciando Sesión (Login)
Cuando mandas la validación a `features/auth/auth.routes.js`, el backend de tu profesor hace el chequeo cruzado de esta manera:

```mermaid
flowchart TD
    A[Cliente solicita entrar en: POST /api/auth] --> B{Zod revisa correos}
    B -- Correcto --> C[Lo buscamos en las filas de USERS de SQLite]
    C --> D{¿Hay email y su estado Verified = 1?}
    D -- Falso --> E[Denegado 403: Usuario Invalido]
    D -- Verdadero --> F{Compara contraseña tipeada \n cruzándola con SQLite}
    F -- Match incorrecto --> E
    F -- Perfecto Match --> G[Se emite Access Token \n que le vivirá 30 minutos]
    G --> H[Se emite Refresh Token \n que le vivirá 7 días]
    H --> I[Envia tu Refresh Token empaquetado en \n las Cookies del cliente como regalito extra de protección]
    I --> J[Envío de JSON final y finalización de login]
```
