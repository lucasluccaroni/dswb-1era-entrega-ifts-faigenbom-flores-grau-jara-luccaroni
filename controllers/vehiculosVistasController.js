import Vehiculo from "../models/Vehiculo.js";

// mauro: crea error 404 para vista
const crearError404 = () => {
  const error = new Error("Vehiculo no encontrado");
  error.status = 404;
  return error;
};

// mauro: muestra listado y formulario de alta
export const listarVehiculosVista = async (req, res, next) => {
  try {
    const vehiculos = await Vehiculo.find().sort({ patente: 1 });
    res.status(200).render("vehiculos", { titulo: "Vehículos", vehiculos });
  } catch (error) {
    next(error);
  }
};

// mauro: crea un vehiculo desde formulario
export const crearVehiculoVista = async (req, res, next) => {
  try {
    const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado } = req.body;
    await new Vehiculo({ patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado }).save();
    res.redirect("/vehiculos");
  } catch (error) {
    next(error);
  }
};

// mauro: muestra el formulario de edicion
export const editarVehiculoVista = async (req, res, next) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return next(crearError404());
    }
    res.status(200).render("vehiculos-editar", { titulo: "Editar vehículo", vehiculo });
  } catch (error) {
    next(error);
  }
};

// mauro: guarda los cambios del formulario
export const actualizarVehiculoVista = async (req, res, next) => {
  try {
    const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado } = req.body;
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado },
      { returnDocument: "after", runValidators: true }
    );
    if (!vehiculoActualizado) {
      return next(crearError404());
    }
    res.redirect("/vehiculos");
  } catch (error) {
    next(error);
  }
};

// mauro: elimina un vehiculo desde vista
export const eliminarVehiculoVista = async (req, res, next) => {
  try {
    const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculoEliminado) {
      return next(crearError404());
    }
    res.redirect("/vehiculos");
  } catch (error) {
    next(error);
  }
};