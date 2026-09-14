const fs = require("fs");
const path = require("path");
const Incidencia = require("../models/Incidencia");

const rutaArchivo = path.join(__dirname, "../data/incidencias.json");

// ivan: lee las incidencias del json
const leerIncidencias = () => {
  const datos = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(datos);
};

// ivan: guarda las incidencias en json
const guardarIncidencias = (datos) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2), "utf-8");
};

// ivan: obtiene todas las incidencias guardadas
const obtenerIncidencias = (req, res) => {
  const incidencias = leerIncidencias();

  // Si la petición acepta HTML (navegador), renderiza la vista en Pug
  if (req.accepts("html")) {
    return res.render("incidencias", { incidencias });
  }

  // De lo contrario responde en JSON (Thunder Client)
  res.json(incidencias);
};

// ivan: obtiene una incidencia por id
const obtenerIncidenciaPorId = (req, res) => {
  const incidencias = leerIncidencias();
  const id = Number(req.params.id);
  const incidencia = incidencias.find((item) => item.id === id);

  if (!incidencia) {
    return res.status(404).json({ error: "Incidencia no encontrada" });
  }

  res.json(incidencia);
};

// ivan: crea una nueva incidencia
const crearIncidencia = (req, res) => {
  const { tipo, descripcion } = req.body;
  const incidencias = leerIncidencias();

  const nuevaIncidencia = new Incidencia(Date.now(), tipo, descripcion);
  incidencias.push(nuevaIncidencia);
  guardarIncidencias(incidencias);

  // Si viene desde formulario HTML redirige a la vista
  if (req.accepts("html") && req.headers["content-type"] === "application/x-www-form-urlencoded") {
    return res.redirect("/incidencias");
  }

  res.status(201).json(nuevaIncidencia);
};

// ivan: actualiza registro de una incidencia
const actualizarIncidencia = (req, res) => {
  const incidencias = leerIncidencias();
  const id = Number(req.params.id);
  const index = incidencias.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Incidencia no encontrada" });
  }

  const { tipo, descripcion } = req.body;
  incidencias[index] = {
    ...incidencias[index],
    tipo: tipo || incidencias[index].tipo,
    descripcion: descripcion || incidencias[index].descripcion
  };

  guardarIncidencias(incidencias);
  res.json(incidencias[index]);
};

// ivan: elimina registro de una incidencia
const eliminarIncidencia = (req, res) => {
  const incidencias = leerIncidencias();
  const id = Number(req.params.id);
  const incidenciasFiltradas = incidencias.filter((item) => item.id !== id);

  if (incidencias.length === incidenciasFiltradas.length) {
    return res.status(404).json({ error: "Incidencia no encontrada" });
  }

  guardarIncidencias(incidenciasFiltradas);
  res.json({ mensaje: "Incidencia eliminada correctamente" });
};

module.exports = {
  obtenerIncidencias,
  obtenerIncidenciaPorId,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia
};
