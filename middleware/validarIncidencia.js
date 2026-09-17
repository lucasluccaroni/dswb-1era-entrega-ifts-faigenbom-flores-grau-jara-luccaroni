// ivan: valida campos requeridos de incidencia
const validarIncidencia = (req, res, next) => {
  const { tipo, descripcion } = req.body;
  if (!tipo || !descripcion) {
    return res.status(400).json({ error: "tipo y descripcion son requeridos" });
  }
  next();
};

module.exports = validarIncidencia;
