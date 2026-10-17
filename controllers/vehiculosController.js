// mauro: controlador api de vehiculos
import Vehiculo from "../models/Vehiculo.js";

// mauro: lista todos los vehiculos
export const obtenerVehiculos = async (req, res, next) => {
  try {
    const vehiculos = await Vehiculo.find().sort({ patente: 1 });
    res.status(200).json(vehiculos);
  } catch (error) {
    next(error);
  }
};

// mauro: busca un vehiculo por id
export const obtenerVehiculoPorId = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    next(error);
  }
};

// mauro: crea un vehiculo nuevo
export const crearVehiculo = async (req, res, next) => {
  try {
    const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado } = req.body;
    const nuevoVehiculo = new Vehiculo({
      patente,
      tipo,
      capacidadKg,
      temperaturaMin,
      temperaturaMax,
      estado,
    });
    await nuevoVehiculo.save();
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    next(error);
  }
};

// mauro: actualiza un vehiculo existente
export const actualizarVehiculo = async (req, res, next) => {
  try {
    const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado } = req.body;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado },
      { returnDocument: "after", runValidators: true }
    );
    if (!vehiculoActualizado) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.status(200).json(vehiculoActualizado);
  } catch (error) {
    next(error);
  }
};

// mauro: elimina un vehiculo por id
export const eliminarVehiculo = async (req, res, next) => {
  try {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculoEliminado) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

