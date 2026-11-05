// ==========================================================================
// COSTURA 1: HASH DE CONTRASEÑAS  |  Dueño: ficha 1 (hash)
// Hoy es un PLACEHOLDER INSEGURO: guarda la contraseña en texto plano.
// Reemplazá TODO el contenido manteniendo estos dos nombres y sus firmas:
//   hashearPassword(password)            -> Promise<{ salt, passwordHash }>
//   verificarPassword(password, usuario) -> Promise<boolean>
// Los controladores de usuarios ya llaman a estas dos funciones.
// ==========================================================================

// lucas: placeholder, guarda texto plano
export const hashearPassword = async (password) => {
  return { salt: "", passwordHash: password };
};

// lucas: placeholder, compara texto plano
export const verificarPassword = async (password, usuario) => {
  return usuario.passwordHash === password;
};
