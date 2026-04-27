# 5. Diagramas y Estructura Organizativa

> **Tip:** Para ver estos diagramas de forma gráfica en VSCode, abre este archivo y presiona `Ctrl + Shift + V` (con la extensión **Markdown Preview Enhanced** instalada).

A veces es mucho más fácil estudiar un código si lo vemos visualmente en vez de leer líneas completas. A continuación tienes el panorama visual de qué es lo que hace tu aplicación basándonos en la estructura de tu profesor.

## 1. Organización de Carpetas (La Arquitectura)

Tu proyecto se rige por un esquema de "módulos de características" (features). Todo está concentrado dentro de carpetas independientes para no mezclar lógicas. Así está la radiografía:

```text
sistema-facturacion/
├── apps/
│   ├── api/                              (Tu Servidor / Backend)
│   │   ├── db/
│   │   │   ├── index.js                  # Conexión a la base de datos
│   │   │   └── tables.js                 # CREATE TABLE en SQLite
│   │   ├── features/
│   │   │   ├── auth/                     # Login, verificación, sesiones
│   │   │   └── user/                     # Registro de usuarios nuevos
│   │   ├── services/
│   │   │   └── nodemailer.js             # Envío de correos con Gmail
│   │   ├── .env                          # Claves secretas (NO subir a GitHub)
│   │   ├── config.js                     # Variables de configuración
│   │   ├── index.js                      # App principal en puerto 3000
│   │   ├── package.json                  # Dependencias del backend
│   │   └── test.http                     # Pruebas manuales de las rutas
│   └── client/                           (Tu Frontend / Interfaz Visual)
│       └── src/
│           ├── components/               # Navbar, Spinner, Notificaciones
│           ├── features/                 # Lógica de autenticación del cliente
│           ├── layout/                   # Layouts base (público, privado)
│           ├── pages/                    # index, login, signup, verify
│           └── styles/
│               └── global.css            # Tailwind + configuración dark mode
└── documentacion/                        # Carpeta de estudio y repaso
```

---

## 2. Diagrama de la Base de Datos (Relaciones)

Actualmente nuestra base de datos trabaja con estas entidades que se complementan por sus llaves foráneas (FK):

```mermaid
erDiagram
    USERS ||--o{ SESSIONS : "posee muchas"
    USERS {
        int id PK "Llave principal"
        string email UK "Unico en DB"
        string password_hash
        boolean email_verified "0 o 1"
    }
    SESSIONS {
        int id PK
        string jwtid UK "ID unico de la sesion"
        int user_id FK "Dueno de la cuenta"
    }
```

*(Cuando agreguemos productos y ventas, aparecerán más tablas conectadas aquí)*

---

## 3. Diagrama de Flujo: Creacion de Cuenta y Verificacion

Así es como tu computadora toma sus decisiones en `features/user/user.routes.js`:

```mermaid
flowchart TD
    A["Cliente manda correo y clave a POST /api/user"] --> B{"Pasa filtro Zod?"}
    B -- "No, mala clave o correo" --> C["Devuelve 400 Bad Request"]
    B -- "Todo correcto" --> D["Encripta password con BCRYPT"]
    D --> E["Guarda en DB con email_verified = 0"]
    E --> F["Firma Token JWT con 1hr de vida"]
    F --> G["Nodemailer envia el correo"]
    G --> H["Responde Status 201 al cliente"]
    H --> I["El usuario abre su Email"]
    I --> J["Da clic y manda PATCH al Server"]
    J --> K{"Se revisa el Token"}
    K -- "Esta Expirado" --> L["Se reenvia un NUEVO correo"]
    K -- "Correcto" --> M["Actualiza DB: email_verified = 1"]
    M --> N["Responde: Cuenta Verificada"]
```

---

## 4. Diagrama de Flujo: Iniciando Sesion (Login)

Cuando mandas la validacion a `features/auth/auth.routes.js`, el backend hace el chequeo:

```mermaid
flowchart TD
    A["Cliente solicita POST /api/auth/login"] --> B{"Zod revisa el formato"}
    B -- "Correcto" --> C["Busca email en tabla USERS"]
    C --> D{"Existe y email_verified = 1?"}
    D -- "No" --> E["Denegado 403: Usuario Invalido"]
    D -- "Si" --> F{"Compara password con bcrypt"}
    F -- "No coincide" --> E
    F -- "Coincide" --> G["Genera Access Token de 30min"]
    G --> H["Genera Refresh Token de 7 dias"]
    H --> I["Guarda sesion en tabla SESSIONS"]
    I --> J["Envia Refresh Token en Cookie"]
    J --> K["Responde JSON con accessToken"]
```

---

## 5. Diagrama de Flujo: Sistema de Temas (Dark Mode)

Asi funciona el toggle de modo oscuro/claro en el frontend:

```mermaid
flowchart TD
    A["Usuario abre la pagina"] --> B{"Hay tema en localStorage?"}
    B -- "Si, dark" --> C["Agrega clase dark al HTML"]
    B -- "Si, light" --> D["Quita clase dark del HTML"]
    B -- "No hay nada" --> E{"Sistema operativo prefiere oscuro?"}
    E -- "Si" --> C
    E -- "No" --> D
    C --> F["Muestra icono de Sol en Navbar"]
    D --> G["Muestra icono de Luna en Navbar"]
    F --> H["Usuario hace clic en el boton"]
    G --> H
    H --> I["Alterna clase dark en HTML"]
    I --> J["Guarda preferencia en localStorage"]
    J --> K["Actualiza el icono"]
```
