// lucas: controlador vistas de choferes
import Chofer from "../models/Chofer.js";

// lucas: crea error 404 para vista
const crearError404 = () => {
  const error = new Error("Chofer no encontrado");
  error.status = 404;
  return error;
};

// lucas: lista choferes en vista web
export const listarChoferesVista = async (req, res, next) => {
  try {
    const choferes = await Chofer.find().sort({ apellido: 1, nombre: 1 });
    res.status(200).render("choferes", { titulo: "Choferes", choferes });
  } catch (error) {
    next(error);
  }
};

// lucas: crea chofer desde vista web
export const crearChoferVista = async (req, res, next) => {
  try {
    const { nombre, apellido } = req.body;
    await new Chofer({ nombre, apellido }).save();
    res.redirect("/choferes");
  } catch (error) {
    next(error);
  }
};

// lucas: muestra formulario de edicion chofer
export const editarChoferVista = async (req, res, next) => {
  try {
    const chofer = await Chofer.findById(req.params.id);
    if (!chofer) {
      return next(crearError404());
    }
    res.status(200).render("choferes-editar", { titulo: "Editar chofer", chofer });
  } catch (error) {
    next(error);
  }
};

// lucas: actualiza chofer desde vista web
export const actualizarChoferVista = async (req, res, next) => {
  try {
    const { nombre, apellido } = req.body;
    const choferActualizado = await Chofer.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido },
      { returnDocument: "after", runValidators: true }
    );
    if (!choferActualizado) {
      return next(crearError404());
    }
    res.redirect("/choferes");
  } catch (error) {
    next(error);
  }
};

// lucas: elimina chofer desde vista web
export const eliminarChoferVista = async (req, res, next) => {
  try {
    const choferEliminado = await Chofer.findByIdAndDelete(req.params.id);
    if (!choferEliminado) {
      return next(crearError404());
    }
    res.redirect("/choferes");
  } catch (error) {
    next(error);
  }
};
