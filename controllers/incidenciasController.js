// ivan: controlador api de incidencias
import Incidencia from "../models/Incidencia.js";

// ivan: lista todas las incidencias
export const obtenerIncidencias = async (req, res, next) => {
  try {
    const incidencias = await Incidencia.find().sort({ createdAt: -1 });
    res.status(200).json(incidencias);
  } catch (error) {
    next(error);
  }
};

// ivan: busca una incidencia por id
export const obtenerIncidenciaPorId = async (req, res, next) => {
  try {
    const incidencia = await Incidencia.findById(req.params.id);
    if (!incidencia) {
      return res.status(404).json({ error: "Incidencia no encontrada" });
    }
    res.status(200).json(incidencia);
  } catch (error) {
    next(error);
  }
};

// ivan: crea una incidencia nueva
export const crearIncidencia = async (req, res, next) => {
  try {
    const { tipo, descripcion } = req.body;
    const nuevaIncidencia = new Incidencia({ tipo, descripcion });
    await nuevaIncidencia.save();
    res.status(201).json(nuevaIncidencia);
  } catch (error) {
    next(error);
  }
};

// ivan: actualiza una incidencia existente
export const actualizarIncidencia = async (req, res, next) => {
  try {
    const { tipo, descripcion } = req.body;
    const incidenciaActualizada = await Incidencia.findByIdAndUpdate(
      req.params.id,
      { tipo, descripcion },
      { returnDocument: "after", runValidators: true }
    );
    if (!incidenciaActualizada) {
      return res.status(404).json({ error: "Incidencia no encontrada" });
    }
    res.status(200).json(incidenciaActualizada);
  } catch (error) {
    next(error);
  }
};

// ivan: elimina una incidencia por id
export const eliminarIncidencia = async (req, res, next) => {
  try {
    const incidenciaEliminada = await Incidencia.findByIdAndDelete(req.params.id);
    if (!incidenciaEliminada) {
      return res.status(404).json({ error: "Incidencia no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};