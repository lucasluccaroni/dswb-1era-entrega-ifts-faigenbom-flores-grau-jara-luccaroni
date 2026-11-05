import Usuario from "../models/Usuario.js";
import { leerCookies } from "../utils/cookies.js";

// lucas: exige sesion valida en vistas
export const protegerVistas = async (req, res, next) => {
  try {
    const token = leerCookies(req).sesion;
    if (!token) {
      return res.redirect("/login");
    }

    const usuario = await Usuario.findOne({
      sesionToken: token,
      sesionExpira: { $gt: new Date() },
    });
    if (!usuario) {
      return res.redirect("/login");
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
