import Chofer from "../models/Chofer.js";

// lucas: lista todos los choferes
export const obtenerChoferes = async (req, res, next) => {
  try {
    const choferes = await Chofer.find().sort({ apellido: 1, nombre: 1 });
    res.status(200).json(choferes);
  } catch (error) {
    next(error);
  }
};

// lucas: busca un chofer por id
export const obtenerChoferPorId = async (req, res, next) => {
  try {
    const chofer = await Chofer.findById(req.params.id);
    if (!chofer) {
      return res.status(404).json({ error: "Chofer no encontrado" });
    }
    res.status(200).json(chofer);
  } catch (error) {
    next(error);
  }
};

// lucas: crea un chofer nuevo
export const crearChofer = async (req, res, next) => {
  try {
    const { nombre, apellido } = req.body;
    const nuevoChofer = new Chofer({ nombre, apellido });
    await nuevoChofer.save();
    res.status(201).json(nuevoChofer);
  } catch (error) {
    next(error);
  }
};

// lucas: actualiza un chofer existente
export const actualizarChofer = async (req, res, next) => {
  try {
    const { nombre, apellido } = req.body;
    const choferActualizado = await Chofer.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido },
      { new: true, runValidators: true }
    );
    if (!choferActualizado) {
      return res.status(404).json({ error: "Chofer no encontrado" });
    }
    res.status(200).json(choferActualizado);
  } catch (error) {
    next(error);
  }
};

// lucas: elimina un chofer por id
export const eliminarChofer = async (req, res, next) => {
  try {
    const choferEliminado = await Chofer.findByIdAndDelete(req.params.id);
    if (!choferEliminado) {
      return res.status(404).json({ error: "Chofer no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
