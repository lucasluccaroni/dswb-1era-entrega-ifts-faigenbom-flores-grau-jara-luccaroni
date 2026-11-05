// lucas: controlador vistas gestion de usuarios
import Usuario from "../models/Usuario.js";
import { ROLES } from "../models/Usuario.js";
import { hashearPassword } from "../utils/password.js";
import { crearError } from "../utils/errores.js";

// lucas: valida texto no vacio
const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";

// lucas: lista usuarios y muestra alta
export const listarUsuariosVista = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().sort({ nombre: 1 });
    res.status(200).render("usuarios", { titulo: "Usuarios", usuarios, roles: ROLES });
  } catch (error) {
    next(error);
  }
};

// lucas: crea usuario desde la vista
export const crearUsuarioVista = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body ?? {};

    if (!esTextoValido(nombre) || !esTextoValido(email) || !esTextoValido(password)) {
      return next(crearError(400, "nombre, email y password son obligatorios"));
    }
    if (!ROLES.includes(rol)) {
      return next(crearError(400, "El rol debe ser admin u operador"));
    }

    const emailNormalizado = email.toLowerCase().trim();
    if (await Usuario.exists({ email: emailNormalizado })) {
      return next(crearError(409, "El email ya se encuentra registrado"));
    }

    const { salt, passwordHash } = await hashearPassword(password);
    await new Usuario({
      nombre: nombre.trim(),
      email: emailNormalizado,
      passwordHash,
      salt,
      rol,
    }).save();

    res.redirect("/usuarios");
  } catch (error) {
    next(error);
  }
};

// lucas: cambia el rol desde la vista
export const cambiarRolVista = async (req, res, next) => {
  try {
    const { rol } = req.body ?? {};

    if (!ROLES.includes(rol)) {
      return next(crearError(400, "El rol debe ser admin u operador"));
    }
    if (String(req.usuario._id) === req.params.id) {
      return next(crearError(409, "No podes cambiar tu propio rol"));
    }

    const resultado = await Usuario.updateOne({ _id: req.params.id }, { rol }, { runValidators: true });
    if (resultado.matchedCount === 0) {
      return next(crearError(404, "Usuario no encontrado"));
    }

    res.redirect("/usuarios");
  } catch (error) {
    next(error);
  }
};

// lucas: cambia la password desde la vista
export const cambiarPasswordVista = async (req, res, next) => {
  try {
    const { password } = req.body ?? {};

    if (!esTextoValido(password)) {
      return next(crearError(400, "La password no puede estar vacia"));
    }

    const { salt, passwordHash } = await hashearPassword(password);
    const resultado = await Usuario.updateOne(
      { _id: req.params.id },
      { salt, passwordHash, sesionToken: null, sesionExpira: null }
    );
    if (resultado.matchedCount === 0) {
      return next(crearError(404, "Usuario no encontrado"));
    }

    res.redirect("/usuarios");
  } catch (error) {
    next(error);
  }
};

// lucas: elimina usuario desde la vista
export const eliminarUsuarioVista = async (req, res, next) => {
  try {
    if (String(req.usuario._id) === req.params.id) {
      return next(crearError(409, "No podes eliminar tu propio usuario"));
    }

    const resultado = await Usuario.deleteOne({ _id: req.params.id });
    if (resultado.deletedCount === 0) {
      return next(crearError(404, "Usuario no encontrado"));
    }

    res.redirect("/usuarios");
  } catch (error) {
    next(error);
  }
};
