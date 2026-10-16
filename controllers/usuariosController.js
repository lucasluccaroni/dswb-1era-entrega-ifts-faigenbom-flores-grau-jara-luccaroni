// lucas: controlador api de usuarios
import Usuario from "../models/Usuario.js";

// lucas: registra usuario desde api
export const registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    const emailNormalizado = email.toLowerCase().trim();

    const usuarioExistente = await Usuario.findOne({ email: emailNormalizado });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya se encuentra registrado" });
    }

    const nuevoUsuario = new Usuario({
      nombre: nombre.trim(),
      email: emailNormalizado,
      password,
    });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado con exito",
      usuario: {
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// lucas: autentica usuario desde api
export const iniciarSesion = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailNormalizado = email.toLowerCase().trim();

    const usuario = await Usuario.findOne({ email: emailNormalizado, password });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    res.status(200).json({
      mensaje: "Login exitoso",
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
