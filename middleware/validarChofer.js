// lucas: valida campos requeridos de chofer
const validarChofer = (req, res, next) => {
  const { nombre, apellido } = req.body;
  if (!nombre || !apellido) {
    return res.status(400).json({ error: "nombre y apellido son requeridos" });
  }
  next();
};

module.exports = validarChofer;
