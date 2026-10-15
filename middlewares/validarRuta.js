// judith: valida texto no vacio
const esTextoValido = (valor) =>
  typeof valor === "string" && valor.trim() !== "";

// judith: valida campos requeridos
const validarRuta = (req, res, next) => {
  const { choferId, vehiculoId, fecha, horaInicio, horaFinEstimada } =
    req.body ?? {};

  const campos = [choferId, vehiculoId, fecha, horaInicio, horaFinEstimada];

  if (!campos.every(esTextoValido)) {
    return res.status(400).json({
      error: "Los cinco campos de la ruta son obligatorios",
    });
  }

  next();
};

export default validarRuta;