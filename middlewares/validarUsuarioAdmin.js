import { ROLES } from "../models/Usuario.js";

// lucas: valida texto no vacio
const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";

// lucas: valida formato de email
const esEmailValido = (valor) =>
  typeof valor === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

// lucas: valida alta de usuario por admin
export const validarAltaUsuario = (req, res, next) => {
  const { nombre, email, password, rol } = req.body ?? {};

  if (!esTextoValido(nombre) || !esTextoValido(email) || !esTextoValido(password)) {
    return res.status(400).json({ error: "nombre, email y password son obligatorios" });
  }

  if (!esEmailValido(email)) {
    return res.status(400).json({ error: "formato de email invalido" });
  }

  if (!ROLES.includes(rol)) {
    return res.status(400).json({ error: "rol debe ser admin u operador" });
  }

  next();
};

// lucas: valida edicion de usuario por admin
export const validarEdicionUsuario = (req, res, next) => {
  const { rol, password } = req.body ?? {};

  if (rol === undefined && password === undefined) {
    return res.status(400).json({ error: "enviar rol, password o ambos" });
  }

  if (rol !== undefined && !ROLES.includes(rol)) {
    return res.status(400).json({ error: "rol debe ser admin u operador" });
  }

  if (password !== undefined && !esTextoValido(password)) {
    return res.status(400).json({ error: "password no puede estar vacio" });
  }

  next();
};
