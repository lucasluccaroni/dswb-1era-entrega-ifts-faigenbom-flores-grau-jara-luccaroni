import Usuario from "../models/Usuario.js";
import { verificarToken } from "../utils/token.js";
import { crearError } from "../utils/errores.js";

// matias: exige jwt valido en api
export const protegerApi = async (req, res, next) => {
  try {
    const [tipo, token] = (req.headers.authorization || "").split(" ");
    if (tipo !== "Bearer" || !token) {
      return next(crearError(401, "Token requerido"));
    }

    let payload;
    try {
      payload = verificarToken(token);
    } catch {
      return next(crearError(401, "Token invalido o vencido"));
    }

    const usuario = await Usuario.findById(payload.sub);
    if (!usuario) {
      return next(crearError(401, "Usuario inexistente"));
    }

    req.usuario = {
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };
    next();
  } catch (error) {
    next(error);
  }
};
