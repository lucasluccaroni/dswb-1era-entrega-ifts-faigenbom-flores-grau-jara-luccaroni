# FreshRoute B2B - Sistema de Gestión Logística (Segunda Entrega)

Proyecto desarrollado para la materia Desarrollo Web Backend, IFTS 29, 2C 2026.
Equipo: Faigenbom Ivan, Flores Mauro, Grau Judith, Jara Matías, Luccaroni Lucas.

## 1. Descripción del Proyecto
FreshRoute B2B es una solución logística para la gestión y distribución de pedidos. Esta segunda entrega migra la arquitectura previa basada en archivos JSON síncronos hacia una persistencia real y no bloqueante con MongoDB Atlas y Mongoose, implementando una doble interfaz:
- API REST con formato JSON y códigos de estado semánticos bajo el prefijo `/api`.
- Interfaz web basada en renderizado del lado del servidor (SSR) con Pug.

## 2. Requisitos Previos
- Node.js (versión LTS recomendada, 20.x o superior).
- Conexión a Internet para el cluster compartido de MongoDB Atlas (o MongoDB Community Server local como respaldo).
- Cliente HTTP para pruebas de API (Thunder Client, Postman o curl).

## 3. Instalación y Configuración

1. Clonar el repositorio y posicionarse en la rama de trabajo correspondiente:
   ```bash
   git clone https://github.com/lucasluccaroni/dswb-1era-entrega-ifts-faigenbom-flores-grau-jara-luccaroni.git
   cd dswb-1era-entrega-ifts-faigenbom-flores-grau-jara-luccaroni
   ```

2. Instalar dependencias oficiales del proyecto:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Copiar el archivo de plantilla `.env.example` creando un archivo local `.env`:
   ```bash
   cp .env.example .env
   ```
   Completar con los valores correspondientes:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/freshroute?retryWrites=true&w=majority
   ```

4. Ejecutar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## 4. Endpoints de la API REST (/api)

Todos los endpoints responden en formato JSON.

| Recurso | Método | Ruta | Descripción | Estado Éxito |
|---|---|---|---|---|
| General | GET | `/api` | Metadatos y lista de recursos | 200 OK |
| Choferes | GET | `/api/choferes` | Listar todos los choferes | 200 OK |
| Choferes | GET | `/api/choferes/:id` | Obtener un chofer por ID | 200 OK |
| Choferes | POST | `/api/choferes` | Crear un nuevo chofer | 201 Created |
| Choferes | PUT | `/api/choferes/:id` | Actualizar chofer existente | 200 OK |
| Choferes | DELETE | `/api/choferes/:id` | Eliminar chofer | 204 No Content |
| Vehículos | GET | `/api/vehiculos` | Listar todos los vehículos | 200 OK |
| Vehículos | GET | `/api/vehiculos/:id` | Obtener vehículo por ID | 200 OK |
| Vehículos | POST | `/api/vehiculos` | Crear vehículo | 201 Created |
| Vehículos | PUT | `/api/vehiculos/:id` | Actualizar vehículo | 200 OK |
| Vehículos | DELETE | `/api/vehiculos/:id` | Eliminar vehículo | 204 No Content |
| Rutas | GET | `/api/rutas` | Listar rutas de distribución | 200 OK |
| Rutas | GET | `/api/rutas/:id` | Obtener ruta por ID | 200 OK |
| Rutas | POST | `/api/rutas` | Crear ruta | 201 Created |
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

## 5. Rutas de la Interfaz Web (Pug)

| Módulo | Método | Ruta | Descripción |
|---|---|---|---|
| Inicio | GET | `/` | Portal principal con acceso a los módulos |
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

## 6. Estructura del Repositorio
```
├── app.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── config/
│   └── db.js
├── models/
├── controllers/
├── routes/
├── middlewares/
│   └── errorHandler.js
├── views/
│   ├── layout.pug
│   ├── inicio.pug
│   └── error.pug
└── public/
    └── css/
        └── estilos.css
```
