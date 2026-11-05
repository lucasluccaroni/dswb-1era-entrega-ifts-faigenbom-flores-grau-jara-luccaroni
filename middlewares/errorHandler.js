// lucas: detecta peticion de api
const esApi = (req) => req.originalUrl.startsWith("/api");

// lucas: traduce error a status y mensaje
const traducirError = (err) => {
  if (err.type === "entity.parse.failed") {
    return { status: 400, mensaje: "JSON malformado", detalles: [] };
  }
  if (err.name === "ValidationError") {
    const detalles = Object.values(err.errors).map((e) => e.message);
    return { status: 400, mensaje: "Datos inválidos", detalles };
  }
  if (err.name === "CastError") {
    return { status: 400, mensaje: "ID o valor con formato inválido", detalles: [] };
  }
  if (err.code === 11000) {
    return { status: 409, mensaje: "Ya existe un registro con ese valor único", detalles: [] };
  }
  // errores creados con crearError(status, mensaje): 401, 403, 404, 409
  if (Number.isInteger(err.status) && err.status >= 400 && err.status < 500) {
    return { status: err.status, mensaje: err.message, detalles: [] };
  }
  return { status: 500, mensaje: "Error interno del servidor", detalles: [] };
};

// lucas: responde 404 a rutas inexistentes
export const notFound = (req, res) => {
  const mensaje = "Ruta no encontrada";
  if (esApi(req)) {
    return res.status(404).json({ error: mensaje });
  }
  res.status(404).render("error", { titulo: "Error 404", status: 404, mensaje, detalles: [] });
};

// lucas: centraliza respuestas de error
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status, mensaje, detalles } = traducirError(err);
  if (status === 500) {
    console.error(err);
  }
  if (esApi(req)) {
    const cuerpo = { error: mensaje };
    if (detalles.length > 0) {
      cuerpo.detalles = detalles;
    }
    return res.status(status).json(cuerpo);
  }
  res.status(status).render("error", { titulo: `Error ${status}`, status, mensaje, detalles });
};
