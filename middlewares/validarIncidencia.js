// ivan: middleware validacion de incidencia
const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";

// ivan: valida campos requeridos de incidencia
const validarIncidencia = (req, res, next) => {
  const { tipo, descripcion } = req.body ?? {};

  if (!esTextoValido(tipo) || !esTextoValido(descripcion)) {
    return res.status(400).json({ error: "tipo y descripcion son obligatorios" });
  }
  next();
};

export default validarIncidencia;