import { existeChofer, existeVehiculo } from "../utils/relaciones.js";
import { crearError } from "../utils/errores.js";

// judith: valida texto no vacio
const esTextoValido = (valor) =>
  typeof valor === "string" && valor.trim() !== "";

// judith: valida campos requeridos y referencias
const validarRuta = async (req, res, next) => {
  try {
    const { choferId, vehiculoId, fecha, horaInicio, horaFinEstimada } =
      req.body ?? {};

    const campos = [choferId, vehiculoId, fecha, horaInicio, horaFinEstimada];

    if (!campos.every(esTextoValido)) {
      return res.status(400).json({
        error: "Los cinco campos de la ruta son obligatorios",
      });
    }

    if (!(await existeChofer(choferId))) {
      return next(crearError(400, "El chofer indicado no existe"));
    }

    if (!(await existeVehiculo(vehiculoId))) {
      return next(crearError(400, "El vehiculo indicado no existe"));
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validarRuta;
