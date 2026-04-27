# 7. Frontend Visual (Astro + Tailwind)

El frontend de tu sistema de facturación está construido con **Astro** y estilizado con **Tailwind CSS v4**. Vive en la carpeta `apps/client/`.

## Estructura del Frontend

```text
apps/client/src/
├── components/
│   ├── navigation/
│   │   ├── Navbar.astro       # Barra de navegación con toggle de tema
│   │   └── utils.js           # Links y botones dinámicos del menú
│   ├── notification/          # Sistema de notificaciones (toasts)
│   └── Spinner.astro          # Indicador de carga animado
├── features/
│   ├── auth/                  # Servicio de autenticación del cliente
│   └── contacts/              # (Heredado del profesor, se reemplazará por productos)
├── layout/
│   ├── PageLayout.astro       # Layout base: incluye Navbar, dark mode y scripts
│   ├── PrivateRoute.astro     # Rutas que requieren estar logueado
│   └── PublicRoute.astro      # Rutas públicas (login, registro)
├── pages/
│   ├── index.astro            # Página de inicio con tarjetas y botones
│   ├── login.astro            # Formulario de inicio de sesión
│   ├── signup.astro           # Formulario de registro con validación
│   └── verify/                # Página de verificación de correo
└── styles/
    └── global.css             # Importa Tailwind y configura dark mode
```

## Modo Oscuro / Claro (Dark Mode Toggle)

El sistema de temas funciona con 3 piezas:

### 1. `global.css` — Configuración de Tailwind
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```
La línea `@custom-variant` le dice a Tailwind v4 que active las clases `dark:` cuando el elemento `<html>` tenga la clase CSS `dark`, en vez de depender solo de la preferencia del sistema operativo.

### 2. `PageLayout.astro` — Script anti-flash
En el `<head>` del layout hay un script inline que se ejecuta **antes** de que la página se pinte. Lee `localStorage` para saber si el usuario ya eligió un tema y aplica la clase `dark` inmediatamente, evitando el molesto "flash blanco" al cargar.

### 3. `Navbar.astro` — Botón de toggle
El botón con el icono de sol/luna en la barra de navegación:
- Alterna la clase `dark` en el `<html>`
- Guarda la preferencia en `localStorage` (persiste al cerrar el navegador)
- Cambia el icono visible (sol cuando estás en oscuro, luna cuando estás en claro)

## Páginas Principales

### Inicio (`index.astro`)
- Título con degradado (gradiente) usando `bg-linear-to-r` (sintaxis Tailwind v4)
- 3 tarjetas informativas: Seguridad, Inventario, Ventas
- Botones centrados de "Iniciar Sesión" y "Registrar mi PyME"
- Todo el contenido cabe en la pantalla sin necesidad de hacer scroll

### Login (`login.astro`)
- Formulario con icono de usuario, inputs estilizados con fondo adaptable
- Botón índigo con efecto de escala al hacer hover/click
- Enlace cruzado al registro ("¿No tienes cuenta?")

### Registro (`signup.astro`)
- Validación en tiempo real con iconos de check/cross (usando Zod)
- Requisitos de contraseña visibles (8 chars, mayúscula, minúscula, número)
- Spinner de carga al enviar el formulario
- Enlace cruzado al login ("¿Ya tienes cuenta?")
