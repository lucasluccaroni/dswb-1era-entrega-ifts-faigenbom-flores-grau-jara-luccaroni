const fs = require("fs");
const path = require("path");
const Persona = require("../models/examplePersona");

const rutaArchivo = path.join(__dirname, "../data/personas.json");

// lucas: lee archivo json de personas
const leerPersonas = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

// lucas: guarda array en archivo json
const guardarPersonas = (personas) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(personas, null, 2));
};

// lucas: lista todas las personas registradas
const obtenerPersonas = (req, res) => {
  const personas = leerPersonas();
  res.json(personas);
};

// lucas: busca persona por su id
const obtenerPersonaPorId = (req, res) => {
  const personas = leerPersonas();
  const id = parseInt(req.params.id);
  const persona = personas.find((p) => p.id === id);

  if (!persona) {
    return res.status(404).json({ mensaje: "Persona no encontrada" });
  }

  res.json(persona);
};

// lucas: crea y almacena una persona
const crearPersona = (req, res) => {
  const personas = leerPersonas();
  const { id, nombre, apellido } = req.body;
  const nuevoId = id ? parseInt(id) : Date.now();

  const nuevaPersona = new Persona(nuevoId, nombre, apellido);
  personas.push(nuevaPersona);
  guardarPersonas(personas);

  res.status(201).json({
    mensaje: "Persona creada con exito",
    persona: nuevaPersona
  });
};

// lucas: actualiza datos de una persona
const actualizarPersona = (req, res) => {
  const personas = leerPersonas();
  const id = parseInt(req.params.id);
  const persona = personas.find((p) => p.id === id);

  if (!persona) {
    return res.status(404).json({ mensaje: "Persona no encontrada" });
  }

  const { nombre, apellido } = req.body;
  persona.nombre = nombre ?? persona.nombre;
  persona.apellido = apellido ?? persona.apellido;

  guardarPersonas(personas);

  res.json({
    mensaje: "Persona actualizada con exito",
    persona
  });
};

// lucas: elimina persona segun su id
const eliminarPersona = (req, res) => {
  const personas = leerPersonas();
  const id = parseInt(req.params.id);
  const nuevasPersonas = personas.filter((p) => p.id !== id);

  if (personas.length === nuevasPersonas.length) {
    return res.status(404).json({ mensaje: "Persona no encontrada" });
  }

  guardarPersonas(nuevasPersonas);

  res.json({ mensaje: "Persona eliminada con exito" });
};

// lucas: renderiza vista pug de personas
const renderizarVistaPersonas = (req, res) => {
  const personas = leerPersonas();
  res.render("example", { titulo: "Modulo de Ejemplo - Personas", personas });
};

module.exports = {
  obtenerPersonas,
  obtenerPersonaPorId,
  crearPersona,
  actualizarPersona,
  eliminarPersona,
  renderizarVistaPersonas
};
