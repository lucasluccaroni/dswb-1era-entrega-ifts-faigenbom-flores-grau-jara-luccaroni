# FreshRoute B2B: Distribución de pedidos

Sistema de gestión logística para una empresa de distribución de pedidos refrigerados. Permite administrar choferes, vehículos, rutas, entregas e incidencias, desde el navegador (vistas Pug) y desde una API REST en JSON, con **autenticación, autorización por roles e integridad de datos**.

Trabajo práctico de **Desarrollo Web Backend (DSWB)**, IFTS 29, Tecnicatura Superior en Desarrollo de Software, ciclo lectivo 2026. Esta es la **3ª entrega (entrega final)**.

**Equipo:** Luccaroni Lucas, Faigenbom Ivan, Grau Judith, Jara Matías, Flores Mauro .

## Índice

1. [Evolución del proyecto](#1-evolución-del-proyecto)
2. [Tecnologías](#2-tecnologías)
3. [Instalación y ejecución](#3-instalación-y-ejecución)
4. [Variables de entorno](#4-variables-de-entorno)
5. [Usuarios y primer administrador](#5-usuarios-y-primer-administrador)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Seguridad](#7-seguridad)
8. [API REST](#8-api-rest)
9. [Vistas web](#9-vistas-web)
10. [Códigos de estado](#10-códigos-de-estado)
11. [Modelo de datos](#11-modelo-de-datos)
12. [Pruebas](#12-pruebas)
13. [Despliegue](#13-despliegue)
14. [Git y flujo de trabajo](#14-git-y-flujo-de-trabajo)
15. [Alcance y deuda técnica declarada](#15-alcance-y-deuda-técnica-declarada)
16. [Equipo y responsabilidades](#16-equipo-y-responsabilidades)
17. [Uso de IA](#17-uso-de-ia)
18. [Links](#18-links)

---

## 1. Evolución del proyecto

La consigna final pide demostrar una mejora verificable sobre una aplicación ya desarrollada. Se parte de la 2ª entrega (tag `entrega-2`) y se evoluciona en seguridad e integridad de datos.

| Dimensión | 1ª entrega | 2ª entrega | 3ª entrega (esta) |
| :--- | :--- | :--- | :--- |
| Persistencia | Archivos `.json` con `fs` | MongoDB Atlas con Mongoose | Igual, con relaciones verificadas |
| Interfaz | Vistas Pug | Vistas Pug y API JSON | Igual, con sesión y token |
| Seguridad | Ninguna | Login sin protección real, claves en texto plano | Hash de claves, perímetro cerrado, roles |
| Despliegue | No | No | Vercel y Atlas |

### Mejoras de la 3ª entrega

Cada mejora responde a un hallazgo detectado en la 2ª entrega.

| # | Hallazgo en la 2ª entrega | Mejora | Resultado |
| :--- | :--- | :--- | :--- |
| 1 | Contraseñas en texto plano | Hash con `crypto` (PBKDF2 y salt) | La base solo guarda hash y salt |
| 2 | Vistas accesibles sin identificarse | Sesión con cookie `httpOnly` | Sin sesión, redirige a `/login` |
| 3 | API accesible sin identificarse | JWT en el header `Authorization` | Sin token válido, `401` |
| 4 | Cualquier usuario podía hacer cualquier operación | Autorización por roles (RBAC) | `operador` no puede eliminar (`403`) |
| 5 | Referencias a choferes y vehículos sin verificar | `populate`, verificación de existencia y borrado protegido | Datos coherentes (`400` y `409`) |
| + | Sistema no autogestionable | Gestión de usuarios por el admin y primer admin automático | Se administra sin ejecutar comandos |

---

## 2. Tecnologías

| Paquete | Para qué |
| :--- | :--- |
| Node.js (LTS) con ECMAScript Modules | Entorno de ejecución |
| `express` `^5.2.1` | Servidor y rutas |
| `mongoose` `^9.10.3` | ODM para MongoDB |
| `pug` `^3.0.4` | Motor de plantillas |
| `dotenv` `^17.4.2` | Variables de entorno |
| `jsonwebtoken` | Firma y verificación de JWT |
| `nodemon` `^3.1.14` (desarrollo) | Reinicio automático |
| `crypto` (módulo nativo) | Hash de contraseñas con PBKDF2 |

La base de datos es **MongoDB Atlas**. Para ver los datos se usa MongoDB Compass.

No se incorporaron `bcrypt`, `passport`, `express-session` ni `cookie-parser`: no se vieron en clase y el módulo nativo `crypto` y `jsonwebtoken` alcanzan para lo pedido.

---

## 3. Instalación y ejecución

**Requisitos:** Node.js LTS, npm y una base MongoDB (Atlas o local).

```bash
# 1. Clonar el repositorio
git clone https://github.com/lucasluccaroni/dswb-1era-entrega-ifts-faigenbom-flores-grau-jara-luccaroni.git
cd dswb-1era-entrega-ifts-faigenbom-flores-grau-jara-luccaroni

# 2. Instalar dependencias con las versiones exactas del package-lock.json
npm ci

# 3. Crear el archivo de entorno y completarlo (ver sección 4)
cp .env.example .env

# 4. Levantar el servidor
npm run dev      # desarrollo, con nodemon
npm start        # producción
```

El servidor queda en `http://localhost:3000` (o el `PORT` configurado). Hay que levantarlo siempre desde la raíz del proyecto, porque la carpeta de vistas se resuelve de forma relativa.

| Script | Descripción |
| :--- | :--- |
| `npm start` | Inicia con Node |
| `npm run dev` | Inicia con nodemon |
| `npm run migrar-passwords` | Convierte usuarios viejos con contraseña en texto plano a hash con salt |

---

## 4. Variables de entorno

Se definen en un archivo `.env` (nunca se sube al repositorio). El archivo `.env.example` trae los nombres con valores falsos.

| Variable | Obligatoria | Descripción |
| :--- | :---: | :--- |
| `PORT` | No | Puerto del servidor. Por defecto `3000` |
| `MONGO_URI` | Sí | Cadena de conexión a MongoDB, con el nombre de la base |
| `JWT_SECRET` | Sí | Secreto para firmar los tokens. Texto largo y aleatorio |
| `JWT_EXPIRES_IN` | No | Duración del token. Por defecto `1h` |
| `NODE_ENV` | No | `development` o `production` |
| `ADMIN_EMAIL` | Sí | Email del primer administrador |
| `ADMIN_PASSWORD` | Sí | Contraseña del primer administrador |
| `REGISTRO_PUBLICO` | No | `true` habilita `/registro` y `POST /api/usuarios/registro` |

Si falta `JWT_SECRET`, la generación de tokens falla con el mensaje `Falta JWT_SECRET en el archivo .env`.

Ejemplo (valores ficticios):

```env
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/freshroute?retryWrites=true&w=majority
JWT_SECRET=cambiar_por_un_texto_largo_y_aleatorio
JWT_EXPIRES_IN=1h
NODE_ENV=development
ADMIN_EMAIL=admin@ejemplo.com
ADMIN_PASSWORD=cambiar_esta_clave
REGISTRO_PUBLICO=true
```

> **Importante:** las credenciales reales solo van en `.env` (local) o en el panel del hosting. Nunca en el código ni en capturas.

---

## 5. Usuarios y primer administrador

- Al arrancar la app se crea automáticamente el **primer `admin`** con `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
- Quien se registra desde `/registro` (con `REGISTRO_PUBLICO=true`) queda siempre como **`operador`**: el rol nunca se toma del cuerpo de la petición, para que nadie pueda registrarse como admin.
- El `admin` gestiona al resto desde la pantalla `/usuarios`: alta de operadores y admins, cambio de rol y de contraseña, y baja.
- En producción se recomienda poner `REGISTRO_PUBLICO=false`.

---

## 6. Estructura del proyecto

```
freshroute-b2b-backend/
├── app.js                      # servidor, middlewares globales y montaje de routers
├── package.json
├── .env.example
├── config/
│   ├── db.js                   # conexión a MongoDB
│   └── permisos.js             # matriz de permisos por rol (RBAC)
├── models/                     # Chofer, Vehiculo, Ruta, Entrega, Incidencia, Usuario
├── controllers/                # un controlador de API y uno de vistas por módulo
├── routes/                     # un router de API (/api/...) y uno de vistas por módulo
├── middlewares/
│   ├── errorHandler.js         # notFound y manejo centralizado de errores
│   ├── protegerVistas.js       # exige sesión en las vistas
│   ├── protegerApi.js          # exige JWT en la API
│   ├── autorizarRol.js         # autorizar(recurso, accion)
│   └── validar*.js             # validación del cuerpo por módulo
├── utils/
│   ├── password.js             # hashearPassword y verificarPassword
│   ├── token.js                # generarToken y verificarToken
│   ├── relaciones.js           # existencia y uso de referencias
│   └── errores.js              # crearError(status, mensaje)
├── scripts/                    # crear-admin y migrar-passwords
├── views/                      # plantillas Pug
└── public/css/estilos.css
```

### Flujo de una petición

```
Petición ──▶ protegerVistas | protegerApi ──▶ autorizar(recurso, accion) ──▶ controlador
Login    ──▶ hashearPassword / verificarPassword ──▶ crearSesion (vistas) | generarToken (API)
Error    ──▶ next(error) ──▶ errorHandler ──▶ JSON (si la URL empieza con /api) o página error.pug
```

---

## 7. Seguridad

### 7.1. Hash de contraseñas

Antes, la contraseña se guardaba tal cual en la colección `usuarios`: quien pudiera ver la base (Compass, un backup, un error) veía todas las claves. Ahora solo se guarda un **hash con salt**, que no se puede revertir, y al iniciar sesión se recalcula y se compara.

| Parámetro | Valor |
| :--- | :--- |
| Algoritmo | `crypto.pbkdf2` (versión asíncrona, envuelta en una Promise) |
| Digest | `sha512` |
| Iteraciones | `210000` |
| Longitud de la clave | `64` bytes |
| Salt | `crypto.randomBytes(16)` en hexadecimal (32 caracteres), uno nuevo por cada contraseña |
| Salida | `passwordHash` en hexadecimal (128 caracteres) y `salt` |
| Comparación | `crypto.timingSafeEqual` entre buffers del mismo largo |

Decisiones de diseño:

- **Salt único por usuario:** dos usuarios con la misma contraseña terminan con hashes distintos, y una tabla precalculada (rainbow table) deja de servir.
- **210000 iteraciones:** encarecen cada intento de fuerza bruta. Un login tarda entre 0,1 y 0,5 segundos.
- **Versión asíncrona (`pbkdf2`, no `pbkdf2Sync`):** el cálculo no bloquea el servidor mientras otras peticiones esperan.
- **`timingSafeEqual`:** evita que el tiempo de respuesta revele cuántos caracteres coincidieron, algo que sí pasa con `===`.
- **`select: false`** en `passwordHash` y `salt`: las consultas no los devuelven salvo que se pidan de forma explícita, así no se filtran por accidente en una respuesta.
- `verificarPassword` devuelve `false` (no lanza error) si el usuario no tiene `salt` o `passwordHash`.

Contrato de `utils/password.js`:

```javascript
hashearPassword(password)            // async -> { salt: string, passwordHash: string }
verificarPassword(password, usuario) // async -> boolean
```

**Usuarios previos:** `npm run migrar-passwords` toma los documentos con campo `password` en texto plano, genera `salt` y `passwordHash`, y elimina el campo `password`. Es idempotente: solo toca los que todavía no tienen hash.

### 7.2. Sesión con cookie en las vistas

El login desde el navegador crea una sesión identificada por una cookie `httpOnly` (no accesible desde JavaScript del cliente). Las vistas pasan por `protegerVistas`: sin sesión redirigen a `/login`. La barra superior muestra el nombre del usuario y el botón Salir.

### 7.3. JWT en la API

`POST /api/usuarios/login` devuelve un token firmado. Todos los endpoints de `/api/choferes|vehiculos|rutas|entregas|incidencias` lo exigen en el header:

```
Authorization: Bearer <token>
```

| Parámetro | Valor |
| :--- | :--- |
| Librería | `jsonwebtoken` |
| Secreto | `JWT_SECRET` |
| Duración | `JWT_EXPIRES_IN`, o `1h` por defecto |
| Payload | `{ sub: <id del usuario>, rol }` más `iat` y `exp` |

`protegerApi` **vuelve a consultar al usuario en la base** en cada petición y toma el rol de ahí, no del payload. Así, un usuario dado de baja o con el rol cambiado deja de tener acceso (o cambia de permisos) sin esperar a que el token venza.

| Situación | Respuesta |
| :--- | :--- |
| Sin header o mal formado | `401` `Token requerido` |
| Token inválido, alterado o vencido | `401` `Token invalido o vencido` |
| El usuario del token ya no existe | `401` `Usuario inexistente` |

Endpoints públicos (sin token): `GET /api`, `POST /api/usuarios/registro` y `POST /api/usuarios/login`.

### 7.4. Autorización por roles (RBAC)

Estar logueado no alcanza: cada usuario tiene un rol (`admin` u `operador`) y cada acción sobre cada recurso está permitida o no según una matriz definida en `config/permisos.js`. El middleware `autorizar(recurso, accion)` corre después de `protegerVistas` o `protegerApi` y consulta `req.usuario.rol`.

| Recurso | `admin` | `operador` |
| :--- | :--- | :--- |
| choferes | ver, crear, editar, eliminar | ver |
| vehiculos | ver, crear, editar, eliminar | ver |
| rutas | ver, crear, editar, eliminar | ver, crear, editar |
| entregas | ver, crear, editar, eliminar | ver, crear, editar |
| incidencias | ver, crear, editar, eliminar | ver, crear, editar |
| usuarios | ver, crear, editar, eliminar | ninguna |

| Situación | Respuesta |
| :--- | :--- |
| Sin `req.usuario` | `401` `No autenticado` |
| Rol inexistente o sin permiso para la acción | `403` `No tenes permiso para esta accion` |
| Con permiso | continúa al controlador |

Por qué la matriz vive en un archivo aparte: cambiar un permiso es editar datos, no lógica, y el middleware no se toca. El rol por defecto al registrarse es `operador` (mínimo privilegio).

**Diferencia entre `401` y `403`:** `401` significa "no sé quién sos" (autenticación); `403` significa "sé quién sos, pero no tenés permiso" (autorización).

### 7.5. Integridad referencial

Una ruta guarda `choferId` y `vehiculoId` como `ObjectId` con `ref`. Se agregó:

- **Verificación de existencia** al crear o actualizar una ruta (API y vistas).
- **Borrado protegido:** no se puede eliminar un chofer o un vehículo que tenga rutas asignadas.
- **`populate`** en el listado y la consulta por id de rutas: se ven nombre del chofer y patente en lugar de ids.

| Situación | Respuesta |
| :--- | :--- |
| Faltan campos de la ruta | `400` `Los cinco campos de la ruta son obligatorios` |
| `choferId` inexistente | `400` `El chofer indicado no existe` |
| `vehiculoId` inexistente | `400` `El vehiculo indicado no existe` |
| Id con formato inválido | `400` `ID o valor con formato inválido` |
| Eliminar chofer con rutas | `409` `No se puede eliminar: el chofer tiene rutas asignadas` |
| Eliminar vehículo con rutas | `409` `No se puede eliminar: el vehiculo tiene rutas asignadas` |

`GET /api/rutas` y `GET /api/rutas/:id` devuelven las referencias pobladas. `POST` y `PUT` siguen recibiendo ids y devolviendo el documento con ids:

```json
{
  "_id": "...",
  "choferId":   { "_id": "...", "nombre": "Ana", "apellido": "Perez" },
  "vehiculoId": { "_id": "...", "patente": "AB123CD", "tipo": "Camión" },
  "fecha": "2026-11-20T00:00:00.000Z",
  "horaInicio": "08:00",
  "horaFinEstimada": "12:00",
  "estado": "pendiente"
}
```

El formulario de edición de rutas no usa `populate`, porque compara ids para preseleccionar los `select`.

### 7.6. Buenas prácticas aplicadas

- Secretos y cadenas de conexión solo en variables de entorno. `.env` y `node_modules` están en `.gitignore`.
- La respuesta de registro y login nunca incluye `password`, `passwordHash` ni `salt`.
- Los errores se crean con `crearError(status, mensaje)` y se pasan a `next(...)`: ningún middleware responde un `403` o `401` a mano, todo pasa por el `errorHandler`.
- Validación en capas: middleware `validarX` en la API, atributo `required` en los formularios y esquema de Mongoose como última red.

---

## 8. API REST

Base: `/api`. Todas las respuestas son JSON. Los errores tienen siempre la forma:

```json
{ "error": "Mensaje", "detalles": ["opcional, en errores de validación"] }
```

### Usuarios (públicos)

| Verbo | Ruta | Descripción | Éxito |
| :--- | :--- | :--- | :--- |
| `GET` | `/api` | Nombre de la API y lista de recursos | `200` |
| `POST` | `/api/usuarios/registro` | Registra un `operador` (requiere `REGISTRO_PUBLICO=true`) | `201` |
| `POST` | `/api/usuarios/login` | Devuelve `{ mensaje, token, usuario }` | `200` |

```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@x.com","password":"abc12345"}'
```

### Recursos protegidos (JWT + rol)

Idénticos para `choferes`, `vehiculos`, `rutas`, `entregas` e `incidencias`:

| Verbo | Ruta | Acción requerida | Éxito |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/recurso` | `ver` | `200` + array |
| `GET` | `/api/recurso/:id` | `ver` | `200` + objeto |
| `POST` | `/api/recurso` | `crear` | `201` + objeto creado |
| `PUT` | `/api/recurso/:id` | `editar` | `200` + objeto actualizado |
| `DELETE` | `/api/recurso/:id` | `eliminar` | `204` sin contenido |

`POST` y `PUT` pasan por el middleware `validarX` del módulo. `PUT` recibe el cuerpo completo.

### Gestión de usuarios (solo `admin`)

Bajo `/api/admin/usuarios`, con el recurso `usuarios` de la matriz. Un `operador` recibe `403`.

```bash
curl http://localhost:3000/api/choferes \
  -H "Authorization: Bearer <token>"
```

---

## 9. Vistas web

Requieren sesión. Sin sesión, redirigen a `/login`.

| Verbo | Ruta | Acción | Resultado |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Inicio con links a los módulos | `200` |
| `GET` | `/login`, `/registro` | Formularios de acceso | `200` |
| `GET` | `/recurso` | Listado con formulario de alta | `200` |
| `POST` | `/recurso` | Crear | redirección a `/recurso` |
| `GET` | `/recurso/:id/editar` | Formulario de edición | `200` |
| `POST` | `/recurso/:id/actualizar` | Guardar cambios | redirección a `/recurso` |
| `POST` | `/recurso/:id/eliminar` | Eliminar | redirección a `/recurso` |
| `GET` | `/usuarios` | Gestión de usuarios (solo `admin`) | `200` |

Recursos: `choferes`, `vehiculos`, `rutas`, `entregas`, `incidencias`. En vehículos existe además `GET /vehiculos/:id`.

Los formularios HTML solo soportan `GET` y `POST`, por eso las vistas usan `POST` para actualizar y eliminar. Si algo falla (dato inválido, id inexistente, sin permiso), se muestra `error.pug` con el estado correspondiente.

Con rol `operador`, los botones de edición y eliminación siguen visibles en las pantallas de choferes y vehículos, pero al usarlos se muestra una página `403`. Ocultarlos según el rol queda fuera del alcance (ver sección 15).

---

## 10. Códigos de estado

| Código | Cuándo |
| :--- | :--- |
| `200 OK` | Lectura o actualización exitosa; páginas renderizadas |
| `201 Created` | Alta exitosa |
| `204 No Content` | Baja exitosa en la API |
| `302 Found` | Redirección tras una acción de formulario |
| `400 Bad Request` | Campo faltante o inválido, `enum` inválido, id mal formado, referencia inexistente, JSON malformado |
| `401 Unauthorized` | Sin sesión o token, token inválido o vencido, credenciales inválidas |
| `403 Forbidden` | Autenticado pero sin permiso para la acción |
| `404 Not Found` | Id válido que no existe, o ruta inexistente |
| `409 Conflict` | Valor único repetido (patente) o borrado de algo en uso |
| `500 Internal Server Error` | Error inesperado (lo responde solo el `errorHandler`) |

---

## 11. Modelo de datos

| Modelo | Colección | Campos principales |
| :--- | :--- | :--- |
| `Chofer` | `choferes` | `nombre`, `apellido` |
| `Vehiculo` | `vehiculos` | `patente` (única, mayúsculas), `tipo` (`Camión`, `Camioneta`, `Furgoneta`), `capacidadKg`, `temperaturaMin`, `temperaturaMax`, `estado` (`Disponible`, `En ruta`, `Mantenimiento`) |
| `Ruta` | `rutas` | `choferId` (ref `Chofer`), `vehiculoId` (ref `Vehiculo`), `fecha`, `horaInicio`, `horaFinEstimada` (`HH:MM`), `estado` (`pendiente`, `en_progreso`, `finalizada`) |
| `Entrega` | `entregas` | `cliente`, `direccion`, `estado` (`Pendiente`, `En camino`, `Entregado`) |
| `Incidencia` | `incidencias` | `tipo`, `descripcion` |
| `Usuario` | `usuarios` | `nombre`, `email`, `passwordHash` y `salt` (ocultos con `select: false`), `rol` (`admin` u `operador`) |

Todos los esquemas usan `timestamps` y nombre de colección explícito.

### Relaciones

```
Chofer 1 ────< Ruta >──── 1 Vehiculo
```

Una ruta pertenece a un chofer y a un vehículo. Un chofer o un vehículo puede tener muchas rutas.

---

## 12. Pruebas

Las pruebas son manuales, con Thunder Client o Postman sobre la API y con el navegador sobre las vistas, y se verifican en Compass. Cada integrante probó su ficha sobre su base personal.

### Hash de contraseñas

| # | Caso | Esperado |
| :--- | :--- | :--- |
| H1 | Registro por API | `201`, sin `password`, `passwordHash` ni `salt` en la respuesta |
| H2 | Revisar la colección en Compass | `passwordHash` de 128 caracteres, `salt` de 32 y sin campo `password` |
| H3 | Dos usuarios con la misma clave | `passwordHash` y `salt` distintos |
| H4 | Login correcto por API | `200` con `mensaje`, `token` y `usuario` |
| H5 | Login con clave errónea | `401` `Credenciales invalidas` |
| H6 | Registro y login por las vistas | Redirige a `/` y se ve el nombre con el botón Salir |
| H7 | `npm run migrar-passwords` con un usuario en texto plano | Migrado, sin campo `password`, y el login funciona |
| H8 | Tiempo de login | Entre 0,1 y 0,5 s, sin bloquear otras peticiones |

### JWT

| # | Caso | Esperado |
| :--- | :--- | :--- |
| J1 | `GET /api/choferes` sin header | `401` `Token requerido` |
| J2 | Login | `200` y token con tres partes que empieza con `eyJ` |
| J3 | `GET /api/choferes` con token | `200` y un array |
| J4 | Token alterado | `401` `Token invalido o vencido` |
| J5 | Token vencido (`JWT_EXPIRES_IN=5s`) | `401` `Token invalido o vencido` |
| J6 | Header sin la palabra `Bearer` | `401` `Token requerido` |
| J7 | Usuario borrado con token válido | `401` `Usuario inexistente` |
| J8 | Endpoints públicos sin token | `200`, `201`, `200` |
| J9 | Vehículos, rutas, entregas e incidencias sin token | `401` en los cuatro |

### Roles

| # | Rol | Pedido | Esperado |
| :--- | :--- | :--- | :--- |
| R1 | sin usuario | `GET /api/choferes` | `401` |
| R2 | `operador` | `GET /api/choferes` | `200` |
| R3 | `operador` | `POST /api/choferes` | `403` |
| R4 | `operador` | `DELETE /api/choferes/:id` | `403` y el chofer sigue en Compass |
| R5 | `operador` | `POST /api/rutas` | `201` |
| R6 | `operador` | `PUT /api/incidencias/:id` | `200` |
| R7 | `operador` | `DELETE /api/entregas/:id` | `403` |
| R8 | `admin` | `POST` y `DELETE` de un chofer | `201` y `204` |
| R9 | rol inexistente | `GET /api/choferes` | `403` |
| R10 a R12 | sesión real en el navegador | Operador intenta eliminar o editar un chofer; admin crea, edita y elimina | `403` para el operador; todo funciona para el admin |
| R13, R14 | `admin` y `operador` | `GET /api/admin/usuarios` y `/usuarios` | `200` para el admin; `403` para el operador |

### Relaciones

| # | Caso | Esperado |
| :--- | :--- | :--- |
| L1 | Ruta con chofer inexistente | `400` `El chofer indicado no existe` |
| L2 | Ruta con vehículo inexistente | `400` `El vehiculo indicado no existe` |
| L3 | `choferId` con formato inválido | `400` |
| L4 | Ruta válida | `201` con ids |
| L5 | `GET /api/rutas` y `/api/rutas/:id` | `choferId` y `vehiculoId` poblados |
| L6 | `PUT` con referencia inexistente | `400` |
| L7 | Borrar chofer con ruta | `409` y el chofer sigue en Compass |
| L8 | Borrar vehículo con ruta | `409` |
| L9 | Vista `/rutas` | "Apellido, Nombre" y "Patente (Tipo)" en lugar de ids |
| L10 | Vista: borrar chofer en uso | Página de error `409` |
| L11 | Vista: ruta con referencia inexistente | Página de error `400` |
| L12 | Editar ruta | Los `select` aparecen preseleccionados |
| L13 | Borrar la ruta y luego chofer y vehículo | `204` en los tres |

> La tabla completa de resultados obtenidos (módulo, endpoint, caso, esperado, obtenido, OK o FALLA) y las capturas están en el PDF de documentación.

---

## 13. Despliegue

La aplicación se despliega en **Vercel**, con base en **MongoDB Atlas**.

1. En Atlas, permitir el acceso de red desde la plataforma de despliegue (en **Network Access**) y copiar la cadena de conexión.
2. En Vercel, importar el repositorio.
3. Cargar las variables de entorno en el panel del proyecto: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV=production`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `REGISTRO_PUBLICO`.
4. Desplegar. Al primer arranque se crea el administrador inicial.
5. Ingresar con ese admin y crear al resto de los usuarios desde `/usuarios`.

Aplicación desplegada: **https://dswb-ifts-freshrouteb2b-faigenbom-f.vercel.app/login**

Base de la API desplegada: `https://dswb-ifts-freshrouteb2b-faigenbom-f.vercel.app/api`

Las credenciales del administrador para la evaluación se entregan junto con la documentación (PDF de Drive) y no se publican en este repositorio.

---

## 14. Git y flujo de trabajo

- Repositorio único para las tres entregas. El historial queda marcado con los tags `entrega-1`, `entrega-2` y `entrega-3`.
- Rama base de la 3ª entrega: `3era-entrega`, con la integración hecha mediante archivos "costura" (placeholders con nombres y firmas fijos, ya conectados a `app.js` y a los routers).
- Cada integrante trabajó en su propia rama y **solo sobre los archivos de su ficha**:

| Rama | Integrante | Ficha |
| :--- | :--- | :--- |
| `3ra-mauro` | Mauro | Hash de contraseñas |
| `3ra-matias` | Matías | JWT en la API |
| `3ra-ivan` | Ivan | Autorización por roles |
| `3ra-judith` | Judith | Relaciones e integridad |

- Nadie pushea a `main`: la integración la hace Lucas.
- Convención de commits: `tipo(ficha): descripción`, por ejemplo `feat(hash): hashea passwords con pbkdf2 y salt`. Tipos: `feat`, `fix`, `docs`, `style`.
- Los comentarios del código se firman con el nombre de quien lo escribió, en minúscula y de máximo 6 palabras: `// nombre: descripcion corta`.
- `package-lock.json` está versionado y se instala con `npm ci`, para que todos usen las mismas versiones.

---

## 15. Alcance y deuda técnica declarada

Lo siguiente **no** está implementado y se declara como deuda:

- Refresh tokens, revocación de JWT, recuperación de contraseña, verificación de email y límite de intentos de login.
- Más de una sesión simultánea por usuario en las vistas (el diseño guarda un único token por usuario).
- Auditoría de acciones por usuario, recuperación de contraseña por email y bloqueo de cuentas. La gestión de usuarios incluida es mínima: alta, rol, contraseña y baja.
- Ocultar botones según el rol en las vistas: el `operador` recibe una página `403`.
- Transacciones en las operaciones de relaciones: la verificación y la operación no son atómicas, por lo que existe una ventana mínima entre el chequeo y la acción. En MongoDB se resolvería con transacciones.
- Pruebas automatizadas con frameworks.
- Tecnologías no vistas en clase (`bcrypt`, `passport`, `express-session`, `cookie-parser`).

---

## 16. Equipo y responsabilidades

| Integrante | Responsabilidad en la 3ª entrega |
| :--- | :--- |
| **Mauro Flores** | Ficha 1: hash de contraseñas con PBKDF2 y salt (`utils/password.js`). README |
 **Lucas Luccaroni** | Base de integración, sesiones en las vistas, gestión de usuarios, despliegue y consolidación de la documentación |
| **Matías Jara** | Ficha 3: JWT en la API (`utils/token.js`, `middlewares/protegerApi.js`) |
| **Ivan Faigenbom** | Ficha 4: autorización por roles (`config/permisos.js`, `middlewares/autorizarRol.js`) |
| **Judith Grau** | Ficha 5: relaciones e integridad de datos (`utils/relaciones.js`, rutas, `populate` y borrado protegido) |

Los módulos de la 2ª entrega se mantuvieron: Choferes (Lucas), Vehículos (Mauro), Rutas (Judith), Entregas (Matías) e Incidencias (Ivan).

---

## 17. Uso de IA

Se utilizó asistencia de IA para generar y revisar código a partir de un documento maestro y de fichas por integrante (que fijan decisiones técnicas, contratos y reglas), para redactar documentación y para resolver dudas técnicas. Cada integrante revisó, probó y adaptó el código de su ficha, y el equipo definió las reglas comunes antes de usar la IA. El detalle (herramientas, ejemplos concretos de correcciones) está en la declaración de uso de IA del PDF.

---

## 18. Links

| Recurso | Link |
| :--- | :--- |
| Aplicación desplegada | https://dswb-ifts-freshrouteb2b-faigenbom-f.vercel.app/login |
| API desplegada | https://dswb-ifts-freshrouteb2b-faigenbom-f.vercel.app/api |

---

IFTS 29 · Tecnicatura Superior en Desarrollo de Software · Desarrollo Web Backend · 2026
