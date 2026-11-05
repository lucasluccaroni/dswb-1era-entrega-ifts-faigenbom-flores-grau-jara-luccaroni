// ==========================================================================
// COSTURA 3: JWT PARA LA API  |  Dueño: ficha 3 (jwt)
// Hoy es un PLACEHOLDER: devuelve un texto fijo, no es un token real.
// Reemplazá el contenido manteniendo estos nombres y firmas:
//   generarToken(usuario)  -> string  (JWT firmado con process.env.JWT_SECRET)
//   verificarToken(token)  -> objeto con el payload, o lanza error si no sirve
// El login de la API (usuariosController) ya llama a generarToken.
// ==========================================================================

// lucas: placeholder, devuelve token falso
export const generarToken = (usuario) => {
  return "TOKEN_PENDIENTE";
};

// lucas: placeholder, no verifica nada
export const verificarToken = (token) => {
  throw new Error("verificarToken todavia no esta implementado");
};
