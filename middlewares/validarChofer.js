const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";

// lucas: valida campos requeridos de chofer
const validarChofer = (req, res, next) => {
  const { nombre, apellido } = req.body ?? {};

  if (!esTextoValido(nombre) || !esTextoValido(apellido)) {
    return res.status(400).json({ error: "nombre y apellido son obligatorios" });
  }
  next();
};

export default validarChofer;
