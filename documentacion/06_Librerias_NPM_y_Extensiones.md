# 6. Librerías (NPM) y Extensiones

Para que el servidor tenga súper-poderes, en lugar de programar todo desde nulo, los desarrolladores (y el profesor) utilizaron el ecosistema de paquetes de **NPM (Node Package Manager)**. Aquí tienes un desglose exacto de las librerías que yacen en tu archivo \`package.json\`, junto a las extensiones recomendadas para trabajar en VSCode.

---

## 1. Librerías Instaladas en tu Backend (Dependencias)

Este es el arsenal de herramientas de tu sistema de facturación. Estas se instalan en la carpeta `node_modules`.

* **`express`**: El marco de trabajo web. Su tarea es crear el servidor (tu mesero) y dirigir el tráfico de las peticiones HTTP (`GET`, `POST`, `PATCH`, etc.). Sin él, las rutas serían una pesadilla de programar.
* **`better-sqlite3`**: El puente entre la Base de Datos y Node. Es la librería más famosa y rápida hoy en día para conversar con bases de datos SQLite en tu disco duro (por eso crea el archivo `contacts.db` sin instalar MySQL o Postgres).
* **`bcrypt`**: Su nombre corto es por *B-Crypt*. Nos permite aplicar un "Hash" (destruir y codificar con sal matemática) al texto plano de las contraseñas. Hace posible saber si una contraseña escrita iguala al hash registrado, pero teóricamente es imposible de hackear de reversa.
* **`jsonwebtoken`**: La librería encargada de crear y abrir los `Acces Tokens` que actúan de pasaporte para pasar de una página a otra.
* **`zod`**: Herramienta enfocada en la robustez que verifica los *"Schema"* o planos de la petición. Zod te previene de ataques al corroborar si el correo ingresado realmente luce como correo y evita que manden listas basuras donde van textos.
* **`nodemailer`**: Simula ser un agente local que abre puertas e imita aplicaciones de correos. A través del protocolo SMTP puede encender a tu Gmail para generar notificaciones a correos externos en milésimas de segundo.
* **`cors`**: Permite habilitar o restringir "visitas forasteras" al servidor. Nos permite decirle al servidor que si nuestro Frontend en React/Aster llega desde el puerto 4321, no lo rechace. 
* **`cookie-parser`**: Extrae las benditas cookies (galletitas de sesión como nuestra Refresh Token de 7 días) de los encabezados raros de HTTP y las hace simples y manejables en el código a través de un `req.cookies`.

---

## 2. Extensiones Recomendadas (VSCode)

Para interactuar de manera eficiente con este entorno, probablemente utilizas estas joyas dentro de tu Visual Studio Code:

1. **REST Client o HttpYac**: ¡La alternativa a usar Postman! Te permite redactar peticiones puras de texto en un archivo `test.http` o `.rest`. Con un solo *Send Request*, la extensión imita ser el navegador y charla con tu Backend de inmediato.
2. **SQLite Viewer** (Opcional recomendado): Puesto que el archivo guardado por la base de datos no es texto plano, requieres esta extensión. Te permite dar doble clic al archivo `contacts.db` ¡y lo despliega como si tuvieras Excel en VSCode! para ver instantáneamente si tus clientes se registraron bien.
3. **Markdown Preview Enhanced / Mermaid Preview** (Opcional): Si entras a ver tus diagramas (`05_Diagramas_y_Estructura.md`), esta extensión renderizará los lenguajes de diagrama \`mermaid\` en gráficos estéticamente perfectos dentro de VSCode sin abrirlos externamente.
