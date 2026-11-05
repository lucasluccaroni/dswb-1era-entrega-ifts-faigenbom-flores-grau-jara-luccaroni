import { crearError } from "../utils/errores.js";

// lucas: cierra el registro si no esta habilitado
export const registroPublico = (req, res, next) => {
  if (process.env.REGISTRO_PUBLICO === "true") {
    return next();
  }
  next(crearError(404, "Ruta no encontrada"));
};
