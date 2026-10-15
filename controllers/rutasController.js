import Ruta from "../models/Ruta.js";

// judith: lista todas las rutas
export const obtenerRutas = async (req, res, next) => {
  try {
    const rutas = await Ruta.find();
    res.status(200).json(rutas);
  } catch (error) {
    next(error);
  }
};

// judith: busca ruta por id
export const obtenerRutaPorId = async (req, res, next) => {
  try {
    const ruta = await Ruta.findById(req.params.id);

    if (!ruta) {
      return res.status(404).json({ error: "Ruta no encontrada" });
    }

    res.status(200).json(ruta);
  } catch (error) {
    next(error);
  }
};

// judith: crea una ruta
export const crearRuta = async (req, res, next) => {
  try {
    const {
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
      estado,
    } = req.body;

    const nuevaRuta = new Ruta({
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
      estado,
    });

    await nuevaRuta.save();
    res.status(201).json(nuevaRuta);
  } catch (error) {
    next(error);
  }
};

// judith: actualiza una ruta
export const actualizarRuta = async (req, res, next) => {
  try {
    const {
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
      estado,
    } = req.body;

    const datosActualizados = {
      choferId,
      vehiculoId,
      fecha,
      horaInicio,
      horaFinEstimada,
    };

    if (estado !== undefined) {
      datosActualizados.estado = estado;
    }

    const rutaActualizada = await Ruta.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!rutaActualizada) {
      return res.status(404).json({ error: "Ruta no encontrada" });
    }

    res.status(200).json(rutaActualizada);
  } catch (error) {
    next(error);
  }
};

// judith: elimina una ruta
export const eliminarRuta = async (req, res, next) => {
  try {
    const rutaEliminada = await Ruta.findByIdAndDelete(req.params.id);

    if (!rutaEliminada) {
      return res.status(404).json({ error: "Ruta no encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};