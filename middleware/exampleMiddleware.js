// lucas: valida campos requeridos de persona
const validarPersona = (req, res, next) => {
  const { nombre, apellido } = req.body;
  if (!nombre || !apellido) {
    return res.status(400).json({ error: "nombre y apellido son requeridos" });
  }
  next();
};

module.exports = validarPersona;
