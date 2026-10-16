// matias: verifica texto string no vacio
const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";

// matias: valida campos requeridos de entrega
const validarEntrega = (req, res, next) => {
  const { cliente, direccion } = req.body ?? {};

  if (!esTextoValido(cliente) || !esTextoValido(direccion)) {
    return res.status(400).json({ error: "cliente y direccion son obligatorios" });
  }
  next();
};

export default validarEntrega;
