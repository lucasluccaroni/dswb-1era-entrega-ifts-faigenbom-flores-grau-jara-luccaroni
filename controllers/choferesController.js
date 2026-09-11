const fs = require("fs");
const path = require("path");
const Chofer = require("../models/Chofer");

const rutaArchivo = path.join(__dirname, "../data/choferes.json");

// lucas: lee archivo json de choferes
const leerChoferes = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

// lucas: guarda array en archivo json
const guardarChoferes = (choferes) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(choferes, null, 2));
};

// lucas: renderiza vista principal de choferes
const obtenerChoferes = (req, res) => {
  const choferes = leerChoferes();
  res.render("choferes", { titulo: "Modulo Choferes", choferes });
};

// lucas: busca chofer por su id
const obtenerChoferPorId = (req, res) => {
  const choferes = leerChoferes();
  const id = parseInt(req.params.id);
  const chofer = choferes.find((c) => c.id === id);

  if (!chofer) {
    return res.status(404).json({ mensaje: "Chofer no encontrado" });
  }

  res.json(chofer);
};

// lucas: crea y almacena un chofer
const crearChofer = (req, res) => {
  const choferes = leerChoferes();
  const { id, nombre, apellido } = req.body;
  const nuevoId = id ? parseInt(id) : Date.now();

  const nuevoChofer = new Chofer(nuevoId, nombre, apellido);
  choferes.push(nuevoChofer);
  guardarChoferes(choferes);

  res.status(201).json({
    mensaje: "Chofer creado con exito",
    chofer: nuevoChofer
  });
};

// lucas: actualiza datos de un chofer
const actualizarChofer = (req, res) => {
  const choferes = leerChoferes();
  const id = parseInt(req.params.id);
  const chofer = choferes.find((c) => c.id === id);

  if (!chofer) {
    return res.status(404).json({ mensaje: "Chofer no encontrado" });
  }

  const { nombre, apellido } = req.body;
  chofer.nombre = nombre ?? chofer.nombre;
  chofer.apellido = apellido ?? chofer.apellido;

  guardarChoferes(choferes);

  res.json({
    mensaje: "Chofer actualizado con exito",
    chofer
  });
};

// lucas: elimina chofer segun su id
const eliminarChofer = (req, res) => {
  const choferes = leerChoferes();
  const id = parseInt(req.params.id);
  const nuevosChoferes = choferes.filter((c) => c.id !== id);

  if (choferes.length === nuevosChoferes.length) {
    return res.status(404).json({ mensaje: "Chofer no encontrado" });
  }

  guardarChoferes(nuevosChoferes);

  res.json({ mensaje: "Chofer eliminado con exito" });
};

module.exports = {
  obtenerChoferes,
  obtenerChoferPorId,
  crearChofer,
  actualizarChofer,
  eliminarChofer
};
