import Chofer from "../models/Chofer.js";
import Vehiculo from "../models/Vehiculo.js";
import Ruta from "../models/Ruta.js";

// judith: crea error 404 de ruta
const crearError404 = () => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  return error;
};

// judith: lista rutas en vista
export const listarRutasVista = async (req, res, next) => {
  try {
    const rutas = await Ruta.find();
    const choferes = await Chofer.find();
    const vehiculos = await Vehiculo.find();

    res.status(200).render("rutas", {
      titulo: "Rutas",
      rutas,
      choferes,
      vehiculos,
    });
  } catch (error) {
    next(error);
  }
};

// judith: crea ruta desde vista
export const crearRutaVista = async (req, res, next) => {
  try {
    const {
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
      estado,
    } = req.body;

    await new Ruta({
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
      estado,
    }).save();

    res.redirect("/rutas");
  } catch (error) {
    next(error);
  }
};

// judith: muestra edición de ruta
export const editarRutaVista = async (req, res, next) => {
  try {
    const ruta = await Ruta.findById(req.params.id);

    if (!ruta) {
      return next(crearError404());
    }

    const choferes = await Chofer.find();
    const vehiculos = await Vehiculo.find();

    res.status(200).render("rutas-editar", {
      titulo: "Editar ruta",
      ruta,
      choferes,
      vehiculos,
    });
  } catch (error) {
    next(error);
  }
};

// judith: actualiza ruta desde vista
export const actualizarRutaVista = async (req, res, next) => {
  try {
    const {
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
      estado,
    } = req.body;

    const rutaActualizada = await Ruta.findByIdAndUpdate(
      req.params.id,
      {
        choferId,
        vehiculoId,
        fecha,
        horaInicio,
        horaFinEstimada,
        estado,
      },
      { new: true, runValidators: true }
    );

    if (!rutaActualizada) {
      return next(crearError404());
    }

    res.redirect("/rutas");
  } catch (error) {
    next(error);
  }
};

// judith: elimina ruta desde vista
export const eliminarRutaVista = async (req, res, next) => {
  try {
    const rutaEliminada = await Ruta.findByIdAndDelete(req.params.id);

    if (!rutaEliminada) {
      return next(crearError404());
    }

    res.redirect("/rutas");
  } catch (error) {
    next(error);
  }
};