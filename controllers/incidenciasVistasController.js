// ivan: controlador vistas de incidencias
import Incidencia from "../models/Incidencia.js";

// ivan: crea error 404 para vista
const crearError404 = () => {
  const error = new Error("Incidencia no encontrada");
  error.status = 404;
  return error;
};

// ivan: lista incidencias en vista web
export const listarIncidenciasVista = async (req, res, next) => {
  try {
    const incidencias = await Incidencia.find().sort({ createdAt: -1 });
    res.status(200).render("incidencias", { titulo: "Incidencias", incidencias });
  } catch (error) {
    next(error);
  }
};

// ivan: crea incidencia desde vista web
export const crearIncidenciaVista = async (req, res, next) => {
  try {
    const { tipo, descripcion } = req.body;
    await new Incidencia({ tipo, descripcion }).save();
    res.redirect("/incidencias");
  } catch (error) {
    next(error);
  }
};

// ivan: muestra formulario de edicion incidencia
export const editarIncidenciaVista = async (req, res, next) => {
  try {
    const incidencia = await Incidencia.findById(req.params.id);
    if (!incidencia) {
      return next(crearError404());
    }
    res.status(200).render("incidencias-editar", { titulo: "Editar incidencia", incidencia });
  } catch (error) {
    next(error);
  }
};

// ivan: actualiza incidencia desde vista web
export const actualizarIncidenciaVista = async (req, res, next) => {
  try {
    const { tipo, descripcion } = req.body;
    const incidenciaActualizada = await Incidencia.findByIdAndUpdate(
      req.params.id,
      { tipo, descripcion },
      { new: true, runValidators: true }
    );
    if (!incidenciaActualizada) {
      return next(crearError404());
    }
    res.redirect("/incidencias");
  } catch (error) {
    next(error);
  }
};

// ivan: elimina incidencia desde vista web
export const eliminarIncidenciaVista = async (req, res, next) => {
  try {
    const incidenciaEliminada = await Incidencia.findByIdAndDelete(req.params.id);
    if (!incidenciaEliminada) {
      return next(crearError404());
    }
    res.redirect("/incidencias");
  } catch (error) {
    next(error);
  }
};