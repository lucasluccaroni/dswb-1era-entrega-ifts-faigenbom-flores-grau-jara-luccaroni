import { PERMISOS } from "../config/permisos.js";
import { crearError } from "../utils/errores.js";

// ivan: exige permiso del rol
export const autorizar = (recurso, accion) => (req, res, next) => {
  if (!req.usuario) {
    return next(crearError(401, "No autenticado"));
  }

  const permitidas = PERMISOS[req.usuario.rol]?.[recurso] ?? [];
  if (!permitidas.includes(accion)) {
    return next(crearError(403, "No tenes permiso para esta accion"));
  }

  next();
};
