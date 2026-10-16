// lucas: middleware validacion de usuarios
const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";
const esEmailValido = (valor) =>
  typeof valor === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

// lucas: valida campos en registro api
export const validarRegistro = (req, res, next) => {
  const { nombre, email, password } = req.body ?? {};

  if (!esTextoValido(nombre) || !esTextoValido(email) || !esTextoValido(password)) {
    return res.status(400).json({ error: "nombre, email y password son obligatorios" });
  }

  if (!esEmailValido(email)) {
    return res.status(400).json({ error: "formato de email invalido" });
  }

  next();
};

// lucas: valida campos en login api
export const validarLogin = (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (!esTextoValido(email) || !esTextoValido(password)) {
    return res.status(400).json({ error: "email y password son obligatorios" });
  }

  if (!esEmailValido(email)) {
    return res.status(400).json({ error: "formato de email invalido" });
  }

  next();
};
