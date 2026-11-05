// lucas: controlador api de usuarios
import Usuario from "../models/Usuario.js";
import { hashearPassword, verificarPassword } from "../utils/password.js";
import { generarToken } from "../utils/token.js";

// lucas: arma los datos publicos del usuario
const datosPublicos = (usuario) => ({
  _id: usuario._id,
  nombre: usuario.nombre,
  email: usuario.email,
  rol: usuario.rol,
});

// lucas: registra usuario desde api
export const registrarUsuario = async (req, res, next) => {
  try {
    // el rol nunca se toma del body, siempre arranca como operador
    const { nombre, email, password } = req.body;
    const emailNormalizado = email.toLowerCase().trim();

    const usuarioExistente = await Usuario.findOne({ email: emailNormalizado });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya se encuentra registrado" });
    }

    const { salt, passwordHash } = await hashearPassword(password);
    const nuevoUsuario = new Usuario({
      nombre: nombre.trim(),
      email: emailNormalizado,
      passwordHash,
      salt,
    });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado con exito",
      usuario: datosPublicos(nuevoUsuario),
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

    const usuario = await Usuario.findOne({ email: emailNormalizado }).select(
      "+passwordHash +salt"
    );
    if (!usuario || !(await verificarPassword(password, usuario))) {
      return res.status(401).json({ error: "Credenciales invalidas" });
    }

    const token = await generarToken(usuario);

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario: datosPublicos(usuario),
    });
  } catch (error) {
    next(error);
  }
};
