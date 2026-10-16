// lucas: controlador vistas de usuarios
import Usuario from "../models/Usuario.js";

const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";
const esEmailValido = (valor) =>
  typeof valor === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

// lucas: muestra formulario de registro
export const mostrarRegistroVista = (req, res) => {
  res.status(200).render("registro", {
    titulo: "Registro de usuario",
    error: null,
    valores: {},
  });
};

// lucas: procesa alta de usuario
export const procesarRegistroVista = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body ?? {};

    if (!esTextoValido(nombre) || !esTextoValido(email) || !esTextoValido(password)) {
      return res.status(400).render("registro", {
        titulo: "Registro de usuario",
        error: "Todos los campos son obligatorios",
        valores: { nombre, email },
      });
    }

    if (!esEmailValido(email)) {
      return res.status(400).render("registro", {
        titulo: "Registro de usuario",
        error: "El formato de email no es valido",
        valores: { nombre, email },
      });
    }

    const emailNormalizado = email.toLowerCase().trim();
    const usuarioExistente = await Usuario.findOne({ email: emailNormalizado });

    if (usuarioExistente) {
      return res.status(400).render("registro", {
        titulo: "Registro de usuario",
        error: "El correo electronico ya esta registrado",
        valores: { nombre, email },
      });
    }

    await new Usuario({
      nombre: nombre.trim(),
      email: emailNormalizado,
      password,
    }).save();

    res.redirect("/login?registrado=true");
  } catch (error) {
    next(error);
  }
};

// lucas: muestra formulario de login
export const mostrarLoginVista = (req, res) => {
  const registrado = req.query.registrado === "true";
  res.status(200).render("login", {
    titulo: "Iniciar sesion",
    registrado,
    error: null,
    valores: {},
  });
};

// lucas: valida credenciales y autentica
export const procesarLoginVista = async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};

    if (!esTextoValido(email) || !esTextoValido(password)) {
      return res.status(400).render("login", {
        titulo: "Iniciar sesion",
        registrado: false,
        error: "Debe ingresar email y contraseña",
        valores: { email },
      });
    }

    const emailNormalizado = email.toLowerCase().trim();
    const usuario = await Usuario.findOne({ email: emailNormalizado, password });

    if (!usuario) {
      return res.status(401).render("login", {
        titulo: "Iniciar sesion",
        registrado: false,
        error: "Credenciales invalidas",
        valores: { email },
      });
    }

    res.status(200).render("inicio", {
      titulo: "Inicio",
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
