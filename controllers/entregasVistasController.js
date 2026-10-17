// matias: controlador vistas de entregas
import Entrega from "../models/Entrega.js";

// matias: crea error 404 para vista
const crearError404 = () => {
  const error = new Error("Entrega no encontrada");
  error.status = 404;
  return error;
};

// matias: muestra listado y formulario alta
export const listarEntregasVista = async (req, res, next) => {
  try {
    const entregas = await Entrega.find().sort({ createdAt: -1 });
    res.status(200).render("entregas", { titulo: "Entregas", entregas });
  } catch (error) {
    next(error);
  }
};

// matias: crea entrega desde el formulario
export const crearEntregaVista = async (req, res, next) => {
  try {
    const { cliente, direccion, estado } = req.body;
    await new Entrega({ cliente, direccion, estado }).save();
    res.redirect("/entregas");
  } catch (error) {
    next(error);
  }
};

// matias: muestra el formulario de edicion
export const editarEntregaVista = async (req, res, next) => {
  try {
    const entrega = await Entrega.findById(req.params.id);
    if (!entrega) {
      return next(crearError404());
    }
    res.status(200).render("entregas-editar", { titulo: "Editar entrega", entrega });
  } catch (error) {
    next(error);
  }
};

// matias: guarda cambios del formulario entrega
export const actualizarEntregaVista = async (req, res, next) => {
  try {
    const { cliente, direccion, estado } = req.body;
    const entregaActualizada = await Entrega.findByIdAndUpdate(
      req.params.id,
      { cliente, direccion, estado },
      { returnDocument: "after", runValidators: true }
    );
    if (!entregaActualizada) {
      return next(crearError404());
    }
    res.redirect("/entregas");
  } catch (error) {
    next(error);
  }
};

// matias: elimina una entrega desde vista
export const eliminarEntregaVista = async (req, res, next) => {
  try {
    const entregaEliminada = await Entrega.findByIdAndDelete(req.params.id);
    if (!entregaEliminada) {
      return next(crearError404());
    }
    res.redirect("/entregas");
  } catch (error) {
    next(error);
  }
};
