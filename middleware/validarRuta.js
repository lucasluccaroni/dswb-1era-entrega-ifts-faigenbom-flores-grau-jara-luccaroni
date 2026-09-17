// judith: valida campos requeridos de ruta
const validarRuta = (req, res, next) => {
  const { choferId, vehiculoId, fecha, horaInicio, horaFinEstimada } = req.body;
  if (!choferId || !vehiculoId || !fecha || !horaInicio || !horaFinEstimada) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  next();
};

module.exports = validarRuta;