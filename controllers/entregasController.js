const fs = require("fs");
const path = require("path");
const Entrega = require("../models/Entrega");

const rutaArchivo = path.join(__dirname, "../data/entregas.json");

// matias: lee archivo json de entregas
const leerEntregas = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

// matias: guarda entregas en archivo json
const guardarEntregas = (entregas) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(entregas, null, 2));
};

// matias: lista todas las entregas registradas
const obtenerEntregas = (req, res) => {
  const entregas = leerEntregas();
  res.json(entregas);
};

// matias: busca entrega por su id
const obtenerEntregaPorId = (req, res) => {
  const entregas = leerEntregas();
  const id = parseInt(req.params.id);
  const entrega = entregas.find((e) => e.id === id);

  if (!entrega) {
    return res.status(404).json({ mensaje: "Entrega no encontrada" });
  }

  res.json(entrega);
};

// matias: crea y almacena una entrega
const crearEntrega = (req, res) => {
  const entregas = leerEntregas();
  const { id, cliente, direccion, estado } = req.body;
  const nuevoId = id ? parseInt(id) : Date.now();

  const nuevaEntrega = new Entrega(nuevoId, cliente, direccion, estado);
  entregas.push(nuevaEntrega);
  guardarEntregas(entregas);

  res.status(201).json({
    mensaje: "Entrega creada con exito",
    entrega: nuevaEntrega
  });
};

// matias: actualiza datos de una entrega
const actualizarEntrega = (req, res) => {
  const entregas = leerEntregas();
  const id = parseInt(req.params.id);
  const entrega = entregas.find((e) => e.id === id);

  if (!entrega) {
    return res.status(404).json({ mensaje: "Entrega no encontrada" });
  }

  const { cliente, direccion, estado } = req.body;
  entrega.cliente = cliente ?? entrega.cliente;
  entrega.direccion = direccion ?? entrega.direccion;
  entrega.estado = estado ?? entrega.estado;

  guardarEntregas(entregas);

  res.json({
    mensaje: "Entrega actualizada con exito",
    entrega
  });
};

// matias: elimina entrega segun su id
const eliminarEntrega = (req, res) => {
  const entregas = leerEntregas();
  const id = parseInt(req.params.id);
  const nuevasEntregas = entregas.filter((e) => e.id !== id);

  if (entregas.length === nuevasEntregas.length) {
    return res.status(404).json({ mensaje: "Entrega no encontrada" });
  }

  guardarEntregas(nuevasEntregas);

  res.json({ mensaje: "Entrega eliminada con exito" });
};

// matias: renderiza vista pug de entregas
const renderizarVistaEntregas = (req, res) => {
  const entregas = leerEntregas();
  res.render("entregas", { titulo: "Modulo de Entregas", entregas });
};

module.exports = {
  obtenerEntregas,
  obtenerEntregaPorId,
  crearEntrega,
  actualizarEntrega,
  eliminarEntrega,
  renderizarVistaEntregas
};
