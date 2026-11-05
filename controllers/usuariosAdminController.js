// lucas: controlador api gestion de usuarios
import Usuario from "../models/Usuario.js";
import { hashearPassword } from "../utils/password.js";
import { crearError } from "../utils/errores.js";

// lucas: arma los datos publicos del usuario
const datosPublicos = (usuario) => ({
  _id: usuario._id,
  nombre: usuario.nombre,
  email: usuario.email,
  rol: usuario.rol,
});

// lucas: lista todos los usuarios
export const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().sort({ nombre: 1 });
    res.status(200).json(usuarios.map(datosPublicos));
  } catch (error) {
    next(error);
  }
};

// lucas: crea usuario con el rol elegido
export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const emailNormalizado = email.toLowerCase().trim();

    if (await Usuario.exists({ email: emailNormalizado })) {
      return next(crearError(409, "El email ya se encuentra registrado"));
    }

    const { salt, passwordHash } = await hashearPassword(password);
    const nuevoUsuario = await new Usuario({
      nombre: nombre.trim(),
      email: emailNormalizado,
      passwordHash,
      salt,
      rol,
    }).save();

    res.status(201).json(datosPublicos(nuevoUsuario));
  } catch (error) {
    next(error);
  }
};

// lucas: cambia rol o password de usuario
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { rol, password } = req.body;
    const esElMismo = String(req.usuario._id) === req.params.id;

    if (rol !== undefined && esElMismo) {
      return next(crearError(409, "No podes cambiar tu propio rol"));
    }

    const cambios = {};
    if (rol !== undefined) {
      cambios.rol = rol;
    }
    if (password !== undefined) {
      const { salt, passwordHash } = await hashearPassword(password);
      cambios.salt = salt;
      cambios.passwordHash = passwordHash;
      // cerrar la sesion activa obliga a entrar con la clave nueva
      cambios.sesionToken = null;
      cambios.sesionExpira = null;
    }

    const resultado = await Usuario.updateOne({ _id: req.params.id }, cambios, {
      runValidators: true,
    });
    if (resultado.matchedCount === 0) {
      return next(crearError(404, "Usuario no encontrado"));
    }

    const usuario = await Usuario.findById(req.params.id);
    res.status(200).json(datosPublicos(usuario));
  } catch (error) {
    next(error);
  }
};

// lucas: elimina un usuario por id
export const eliminarUsuario = async (req, res, next) => {
  try {
    if (String(req.usuario._id) === req.params.id) {
      return next(crearError(409, "No podes eliminar tu propio usuario"));
    }

    const resultado = await Usuario.deleteOne({ _id: req.params.id });
    if (resultado.deletedCount === 0) {
      return next(crearError(404, "Usuario no encontrado"));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
