// ==========================================================================
// COSTURA 3: JWT PARA LA API  |  Dueño: ficha 3 (jwt)
// Hoy es un PLACEHOLDER que deja pasar a todos (el perímetro está abierto).
// Reemplazá el contenido manteniendo el nombre exportado `protegerApi`.
// CONTRATO: si el JWT del header Authorization es válido, dejá
// `req.usuario = { _id, nombre, email, rol }` y llamá a next().
// Si no, next(crearError(401, "...")) (utils/errores.js).
// ==========================================================================

// lucas: placeholder, deja pasar a todos
export const protegerApi = (req, res, next) => {
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
