# FreshRoute B2B - Sistema de Gestión Logística (Tercera Entrega)

Proyecto desarrollado para la materia Desarrollo Web Backend, IFTS N°29, Tecnicatura Superior en Desarrollo de Software, 2C 2026.

Equipo **Nexora Software**: Faigenbom Ivan, Flores Mauro, Grau Judith, Jara Matías, Luccaroni Lucas.

**App desplegada (Vercel):** https://dswb-ifts-freshrouteb2b-faigenbom-f.vercel.app/login

## 1. Descripción del Proyecto

FreshRoute B2B es una solución logística para la gestión y distribución de pedidos con cadena de frío. Backend con **Node.js, Express 5, Pug y MongoDB Atlas (Mongoose)**, con una doble interfaz:

- API REST con formato JSON y códigos de estado semánticos bajo el prefijo `/api`.
- Interfaz web con renderizado del lado del servidor (SSR) con Pug.

La 3ª entrega suma seguridad e integridad sobre el MVP de la 2ª:

- **Contraseñas con hash** PBKDF2-SHA512 y salt aleatorio (`crypto` nativo).
- **Sesión por cookie `httpOnly`** en las vistas y **JWT Bearer** en la API.
- **Roles** `admin` y `operador` con matriz de permisos.
- **Relaciones** entre rutas, choferes y vehículos con `populate`, validación de referencias y bloqueo de borrado con `409`.
- **Despliegue** en Vercel con MongoDB Atlas.

---

## 2. Requisitos

### Versiones y herramientas

| Herramienta | Versión |
| --- | --- |
| Node.js | LTS 20.x o superior |
| npm | Viene con Node.js |
| Git | Cualquier versión reciente |
| Cliente HTTP | Thunder Client, Postman o curl |

### Dependencias principales

Se instalan con `npm ci`: `express`, `mongoose`, `pug`, `dotenv`, `jsonwebtoken` y `nodemon` (desarrollo). El hash de contraseñas usa el módulo `crypto` de Node, sin librerías externas.

### Servicios externos

- **MongoDB Atlas**: cluster y usuario de base de datos. En *Network Access* hay que permitir tu IP (o `0.0.0.0/0` para pruebas). Alternativa de respaldo: MongoDB Community Server local.
- **Vercel** (solo despliegue): las variables de entorno se cargan en el panel del proyecto.

### Variables de entorno

Copiar la plantilla y completarla (el `.env` no se sube al repositorio):

```bash
cp .env.example .env
```

```env
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/freshroute?retryWrites=true&w=majority
JWT_SECRET=un_texto_largo_y_aleatorio
JWT_EXPIRES_IN=1h
NODE_ENV=development
ADMIN_EMAIL=admin@ejemplo.com
ADMIN_PASSWORD=una_clave_segura
ADMIN_NOMBRE=Administrador
REGISTRO_PUBLICO=true
```

| Variable | Para qué sirve |
| --- | --- |
| `PORT` | Puerto del servidor |
| `MONGO_URI` | Cadena de conexión a Atlas, con el nombre de la base antes del `?` |
| `JWT_SECRET` | Texto largo y aleatorio con el que se firman los tokens de la API |
| `JWT_EXPIRES_IN` | Duración del token. Por ejemplo `1h` |
| `NODE_ENV` | `development` o `production` (en producción la cookie de sesión es `secure`) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NOMBRE` | Datos del primer administrador. Al arrancar, si no existe ningún `admin`, se crea con estos datos |
| `REGISTRO_PUBLICO` | `true` habilita el registro desde `/registro` y desde la API. Si no se define, el registro queda cerrado y responde `404` |

---

## 3. Comandos

### Instalación

```bash
git clone https://github.com/lucasluccaroni/dswb-1era-entrega-ifts-faigenbom-flores-grau-jara-luccaroni.git
cd dswb-1era-entrega-ifts-faigenbom-flores-grau-jara-luccaroni
npm ci
cp .env.example .env
```

Después completar el `.env` con los valores de la sección anterior.

### Inicialización

Al arrancar por primera vez, el servidor se conecta a Atlas y crea el primer `admin` con `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

### Migración de contraseñas

Si la base tiene usuarios viejos con la clave en texto plano, este script la convierte a hash y salt. Se puede ejecutar más de una vez sin romper nada:

```bash
npm run migrar-passwords
```

### Arranque del servidor

```bash
npm run dev
```

Con el servidor en marcha: `http://localhost:3000`.

| Script | Para qué sirve |
| --- | --- |
| `npm run dev` | Servidor con recarga automática (nodemon) |
| `npm start` | Servidor normal |
| `npm run crear-admin` | Crea o promueve un usuario `admin` con las variables `ADMIN_*`. Herramienta de rescate |
| `npm run migrar-passwords` | Migra contraseñas en texto plano a hash y salt |

---

## 4. Uso mínimo

### Módulos

| Módulo | API | Vistas | Campos principales |
| --- | --- | --- | --- |
| Choferes | `/api/choferes` | `/choferes` | nombre, apellido |
| Vehículos | `/api/vehiculos` | `/vehiculos` | patente (única, mayúsculas), tipo (`Camión`, `Camioneta`, `Furgoneta`), `capacidadKg` (mínimo 1), `temperaturaMin`, `temperaturaMax`, estado (`Disponible`, `En ruta`, `Mantenimiento`) |
| Rutas | `/api/rutas` | `/rutas` | `choferId`, `vehiculoId` (ObjectId con `ref`), fecha, `horaInicio` y `horaFinEstimada` (`HH:MM`), estado (`pendiente`, `en_progreso`, `finalizada`) |
| Entregas | `/api/entregas` | `/entregas` | cliente, dirección, estado (`Pendiente`, `En camino`, `Entregado`) |
| Incidencias | `/api/incidencias` | `/incidencias` | tipo, descripción |

### Endpoints públicos de autenticación

| Verbo | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/usuarios/registro` | Registra un usuario con rol `operador`. Solo existe si `REGISTRO_PUBLICO=true` |
| `POST` | `/api/usuarios/login` | Devuelve un token JWT y los datos públicos del usuario |

### Endpoints de la API REST (`/api`)

Todos responden JSON y **piden `Authorization: Bearer <token>`**.

| Recurso | Método | Ruta | Descripción | Éxito |
|---|---|---|---|---|
| General | GET | `/api` | Metadatos y lista de recursos | 200 OK |
| Choferes | GET | `/api/choferes` | Listar todos los choferes | 200 OK |
| Choferes | GET | `/api/choferes/:id` | Obtener un chofer por ID | 200 OK |
| Choferes | POST | `/api/choferes` | Crear un nuevo chofer | 201 Created |
| Choferes | PUT | `/api/choferes/:id` | Actualizar chofer existente | 200 OK |
| Choferes | DELETE | `/api/choferes/:id` | Eliminar chofer (409 si tiene rutas) | 204 No Content |
| Vehículos | GET | `/api/vehiculos` | Listar todos los vehículos | 200 OK |
| Vehículos | GET | `/api/vehiculos/:id` | Obtener vehículo por ID | 200 OK |
| Vehículos | POST | `/api/vehiculos` | Crear vehículo | 201 Created |
| Vehículos | PUT | `/api/vehiculos/:id` | Actualizar vehículo | 200 OK |
| Vehículos | DELETE | `/api/vehiculos/:id` | Eliminar vehículo (409 si tiene rutas) | 204 No Content |
| Rutas | GET | `/api/rutas` | Listar rutas (chofer y vehículo poblados) | 200 OK |
| Rutas | GET | `/api/rutas/:id` | Obtener ruta por ID (poblada) | 200 OK |
| Rutas | POST | `/api/rutas` | Crear ruta (valida que existan chofer y vehículo) | 201 Created |
| Rutas | PUT | `/api/rutas/:id` | Actualizar ruta | 200 OK |
| Rutas | DELETE | `/api/rutas/:id` | Eliminar ruta | 204 No Content |
| Entregas | GET | `/api/entregas` | Listar entregas a clientes | 200 OK |
| Entregas | GET | `/api/entregas/:id` | Obtener entrega por ID | 200 OK |
| Entregas | POST | `/api/entregas` | Crear entrega | 201 Created |
| Entregas | PUT | `/api/entregas/:id` | Actualizar entrega | 200 OK |
| Entregas | DELETE | `/api/entregas/:id` | Eliminar entrega | 204 No Content |
| Incidencias | GET | `/api/incidencias` | Listar incidencias registradas | 200 OK |
| Incidencias | GET | `/api/incidencias/:id` | Obtener incidencia por ID | 200 OK |
| Incidencias | POST | `/api/incidencias` | Crear incidencia | 201 Created |
| Incidencias | PUT | `/api/incidencias/:id` | Actualizar incidencia | 200 OK |
| Incidencias | DELETE | `/api/incidencias/:id` | Eliminar incidencia | 204 No Content |

La gestión de usuarios (`/api/admin/usuarios`) queda reservada al rol `admin`.

### Rutas de la interfaz web (Pug)

Se usan desde el navegador con sesión iniciada. Sin sesión, redirigen a `/login`.

| Módulo | Método | Ruta | Descripción |
|---|---|---|---|
| Acceso | GET / POST | `/login` | Formulario e inicio de sesión |
| Acceso | GET / POST | `/registro` | Registro (solo con `REGISTRO_PUBLICO=true`) |
| Inicio | GET | `/` | Portal principal con acceso a los módulos |
| Usuarios | GET | `/usuarios` | Gestión de usuarios (solo `admin`) |
| Choferes | GET | `/choferes` | Listado y formulario de alta |
| Choferes | POST | `/choferes` | Creación desde formulario |
| Choferes | GET | `/choferes/:id/editar` | Formulario de edición |
| Choferes | POST | `/choferes/:id/actualizar` | Guardado de modificaciones |
| Choferes | POST | `/choferes/:id/eliminar` | Eliminación desde vista |
| Vehículos | GET | `/vehiculos` | Listado y formulario de alta |
| Vehículos | POST | `/vehiculos` | Creación desde formulario |
| Vehículos | GET | `/vehiculos/:id/editar` | Formulario de edición |
| Vehículos | POST | `/vehiculos/:id/actualizar` | Guardado de modificaciones |
| Vehículos | POST | `/vehiculos/:id/eliminar` | Eliminación desde vista |
| Rutas | GET | `/rutas` | Listado y formulario de alta |
| Rutas | POST | `/rutas` | Creación desde formulario |
| Rutas | GET | `/rutas/:id/editar` | Formulario de edición |
| Rutas | POST | `/rutas/:id/actualizar` | Guardado de modificaciones |
| Rutas | POST | `/rutas/:id/eliminar` | Eliminación desde vista |
| Entregas | GET | `/entregas` | Listado y formulario de alta |
| Entregas | POST | `/entregas` | Creación desde formulario |
| Entregas | GET | `/entregas/:id/editar` | Formulario de edición |
| Entregas | POST | `/entregas/:id/actualizar` | Guardado de modificaciones |
| Entregas | POST | `/entregas/:id/eliminar` | Eliminación desde vista |
| Incidencias | GET | `/incidencias` | Listado y formulario de alta |
| Incidencias | POST | `/incidencias` | Creación desde formulario |
| Incidencias | GET | `/incidencias/:id/editar` | Formulario de edición |
| Incidencias | POST | `/incidencias/:id/actualizar` | Guardado de modificaciones |
| Incidencias | POST | `/incidencias/:id/eliminar` | Eliminación desde vista |

### Roles y permisos

| Recurso | `admin` | `operador` |
| --- | --- | --- |
| Choferes | ver, crear, editar, eliminar | ver |
| Vehículos | ver, crear, editar, eliminar | ver |
| Rutas | ver, crear, editar, eliminar | ver, crear, editar |
| Entregas | ver, crear, editar, eliminar | ver, crear, editar |
| Incidencias | ver, crear, editar, eliminar | ver, crear, editar |
| Usuarios | ver, crear, editar, eliminar | sin acceso |

### Credenciales de prueba

| Rol | Email | Contraseña |
| --- | --- | --- |
| `admin` | [completar] | [completar] |
| `operador` | [completar] | [completar] |

### Comportamiento esperado

| Situación | Respuesta |
| --- | --- |
| Datos válidos al crear | `201` |
| Consulta o modificación correcta | `200` |
| Eliminación correcta | `204` |
| Falta un campo, dato inválido, `id` mal formado o referencia inexistente | `400` |
| Sin token o con token inválido | `401` |
| Rol sin permiso para la acción | `403` |
| Recurso inexistente | `404` |
| Dato duplicado (por ejemplo una patente repetida) o borrar algo en uso | `409` |
| Error interno | `500` |

Prueba rápida con `curl`:

```bash
# 1. Login
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ejemplo.com","password":"una_clave_segura"}'

# 2. Listar vehículos con el token recibido
curl http://localhost:3000/api/vehiculos \
  -H "Authorization: Bearer TOKEN_RECIBIDO"
```

Con una clave incorrecta, el login responde `401` con el mensaje "Credenciales invalidas". Las respuestas nunca incluyen `password`, `passwordHash` ni `salt`.

---

## 5. Seguridad

- **Contraseñas:** PBKDF2 con SHA-512, 210000 iteraciones y salt aleatorio de 16 bytes por usuario (`utils/password.js`). La comparación usa `timingSafeEqual`.
- **Vistas:** al hacer `POST /login` se guarda un token de sesión aleatorio en el documento del usuario y se envía en la cookie `sesion` (`httpOnly`, `sameSite=lax`, `secure` en producción, vigencia de 1 hora). Al cerrar sesión se invalidan el token y la cookie.
- **API:** JWT firmado con `JWT_SECRET` (payload `{ sub, rol }`, duración según `JWT_EXPIRES_IN`). En cada pedido se verifica la firma y se recarga el usuario desde MongoDB, por lo que el rol vigente sale de la base, nunca del cuerpo del pedido.
- **Autorización:** matriz de permisos por rol (`config/permisos.js`) aplicada en cada ruta con `autorizar(recurso, accion)`.
- **Datos sensibles:** `passwordHash`, `salt` y `sesionToken` tienen `select: false`; las respuestas nunca los incluyen.
- **Relaciones:** se valida que el chofer y el vehículo de una ruta existan, y no se puede eliminar un chofer o vehículo con rutas asignadas.

## 6. Pruebas

No hay pruebas automatizadas. Las pruebas son manuales y estructuradas: Thunder Client o Postman para la API, el navegador para las vistas y MongoDB Compass para verificar lo guardado (por ejemplo, `passwordHash` de 128 caracteres, `salt` de 32 y ningún texto plano). Los casos y su evidencia están en el documento único de la entrega (Reporte de Pruebas).

## 7. Limitaciones conocidas

- Un único `sesionToken` activo por usuario (no hay varias sesiones simultáneas).
- No hay refresh tokens ni revocación de JWT.
- No hay recuperación de contraseña, verificación de correo ni límite de intentos de login.
- Los botones no se ocultan según el rol en las vistas: la acción no permitida responde `403`.
- Comprobar referencias y borrar no forman una transacción de MongoDB.
- No se usan WebSockets, bcrypt, `express-session` ni frameworks de testing, por decisión del equipo (ver documento de la entrega).

## 8. Estructura del Repositorio

```
├── app.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── config/          # db.js y permisos.js
├── models/          # esquemas de Mongoose
├── controllers/     # lógica por módulo (API y vistas)
├── routes/          # un router para la API y uno para las vistas por módulo
├── middlewares/     # validación, protegerVistas, protegerApi, autorizarRol, errorHandler
├── scripts/         # crear-admin y migrar-passwords
├── utils/           # password, token, relaciones, errores, cookies
├── views/           # plantillas Pug (layout, inicio, error y una por módulo)
└── public/
    └── css/
        └── estilos.css
```
