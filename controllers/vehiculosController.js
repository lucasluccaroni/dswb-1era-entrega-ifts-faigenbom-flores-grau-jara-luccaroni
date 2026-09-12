const fs = require("fs");
const path = require("path");
const Vehiculo = require("../models/Vehiculo");

const rutaArchivo = path.join(__dirname, "../data/vehiculos.json");

// mauro: lee archivo json de vehiculos
const leerVehiculos = () => {
  const data = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(data);
};

// mauro: guarda array en archivo json
const guardarVehiculos = (vehiculos) => {
  fs.writeFileSync(rutaArchivo, JSON.stringify(vehiculos, null, 2));
};

// mauro: lista todos los vehiculos registrados
const obtenerVehiculos = (req, res) => {
  const vehiculos = leerVehiculos();
  res.json(vehiculos);
};

// mauro: busca vehiculo por su id
const obtenerVehiculoPorId = (req, res) => {
  const vehiculos = leerVehiculos();
  const id = parseInt(req.params.id);
  const vehiculo = vehiculos.find((v) => v.id === id);

  if (!vehiculo) {
    return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
  }

  res.json(vehiculo);
};

// mauro: crea un vehiculo nuevo
const crearVehiculo = (req, res) => {
  const vehiculos = leerVehiculos();
  const nuevoId = vehiculos.length > 0 ? Math.max(...vehiculos.map((v) => v.id)) + 1 : 1;
  const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado } = req.body;
  const nuevoVehiculo = new Vehiculo(nuevoId, patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado);

  vehiculos.push(nuevoVehiculo);
  guardarVehiculos(vehiculos);
  res.status(201).json(nuevoVehiculo);
};

// mauro: edita un vehiculo existente
const actualizarVehiculo = (req, res) => {
  const vehiculos = leerVehiculos();
  const id = parseInt(req.params.id);
  const vehiculoIndex = vehiculos.findIndex((v) => v.id === id);

  if (vehiculoIndex === -1) {
    return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
  }

  vehiculos[vehiculoIndex] = { ...vehiculos[vehiculoIndex], ...req.body };
  guardarVehiculos(vehiculos);
  res.json(vehiculos[vehiculoIndex]);
};

// mauro: elimina un vehiculo por id
const eliminarVehiculo = (req, res) => {
  const vehiculos = leerVehiculos();
  const id = parseInt(req.params.id);
  const vehiculoIndex = vehiculos.findIndex((v) => v.id === id);

  if (vehiculoIndex === -1) {
    return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
  }

  const vehiculosActualizados = vehiculos.filter((v) => v.id !== id);
  guardarVehiculos(vehiculosActualizados);
  res.status(204).send();
};

module.exports = {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
};