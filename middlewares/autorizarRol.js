// ==========================================================================
// COSTURA 4: AUTORIZACIÓN POR ROLES (RBAC)  |  Dueño: ficha 4 (roles)
// Hoy es un PLACEHOLDER que autoriza a todos.
// Reemplazá el contenido manteniendo el nombre exportado `autorizar`.
// Los 10 routers ya lo usan así:  autorizar("choferes", "crear")
// Recursos: choferes, vehiculos, rutas, entregas, incidencias, usuarios.
// Acciones: ver, crear, editar, eliminar.
// CONTRATO: sin req.usuario -> next(crearError(401, ...)).
//           rol sin permiso -> next(crearError(403, ...)).
// ==========================================================================

// lucas: placeholder, autoriza a todos
export const autorizar = (recurso, accion) => (req, res, next) => {
  next();
};
