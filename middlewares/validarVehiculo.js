// mauro: chequea texto no vacio
const esTextoValido = (valor) => typeof valor === "string" && valor.trim() !== "";

// mauro: chequea numero finito valido
const esNumeroValido = (valor) => typeof valor === "number" && Number.isFinite(valor);

// mauro: valida campos requeridos de vehiculo
const validarVehiculo = (req, res, next) => {
  const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax } = req.body ?? {};

  if (!esTextoValido(patente) || !esTextoValido(tipo)) {
    return res.status(400).json({ error: "patente y tipo son obligatorios" });
  }

  if (
    !esNumeroValido(capacidadKg) ||
    !esNumeroValido(temperaturaMin) ||
    !esNumeroValido(temperaturaMax)
  ) {
    return res
      .status(400)
      .json({ error: "capacidadKg, temperaturaMin y temperaturaMax deben ser numeros" });
  }

  if (temperaturaMin > temperaturaMax) {
    return res
      .status(400)
      .json({ error: "temperaturaMin no puede ser mayor que temperaturaMax" });
  }

  next();
};

export default validarVehiculo;