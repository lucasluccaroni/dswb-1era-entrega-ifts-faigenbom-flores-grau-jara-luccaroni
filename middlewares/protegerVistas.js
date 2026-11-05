// ==========================================================================
// COSTURA 2: SESIONES Y COOKIES (vistas Pug)  |  Dueño: ficha 2 (sesiones)
// Hoy es un PLACEHOLDER que deja pasar a todos (el perímetro está abierto).
// Reemplazá el contenido manteniendo el nombre exportado `protegerVistas`.
// CONTRATO: si la sesión es válida, dejá `req.usuario = { _id, nombre, email, rol }`
// y llamá a next(). Si no, redirigí a /login.
// ==========================================================================

// lucas: placeholder, deja pasar a todos
export const protegerVistas = (req, res, next) => {
  // BLOQUE SOLO DE DESARROLLO: simula un usuario para probar roles.
  // BORRALO por completo cuando implementes la costura real.
  if (process.env.DEV_FAKE_ROL) {
    req.usuario = {
      _id: "000000000000000000000001",
      nombre: "Usuario de desarrollo",
      email: "dev@local",
      rol: process.env.DEV_FAKE_ROL,
    };
  }
  next();
};
