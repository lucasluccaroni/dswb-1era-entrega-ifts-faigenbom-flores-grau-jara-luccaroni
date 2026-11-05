// ==========================================================================
// COSTURA 4: AUTORIZACIÓN POR ROLES (RBAC)  |  Dueño: ficha 4 (roles)
// Hoy está vacía. La ficha 4 define acá la matriz rol -> recurso -> acciones:
//   { admin: { choferes: ["ver", "crear", "editar", "eliminar"], ... },
//     operador: { choferes: ["ver"], ... } }
// Recursos: choferes, vehiculos, rutas, entregas, incidencias y usuarios
// (usuarios: solo admin, el operador no tiene ninguna accion).
// ==========================================================================

// lucas: matriz de permisos por rol
export const PERMISOS = {
  admin: {},
  operador: {},
};
