// matias: valida campos requeridos de entrega
const validarEntrega = (req, res, next) => {
  const { cliente, direccion, estado } = req.body;
  if (!cliente || !direccion || !estado) {
    return res.status(400).json({ error: "cliente, direccion y estado son requeridos" });
  }
  next();
};

module.exports = validarEntrega;
