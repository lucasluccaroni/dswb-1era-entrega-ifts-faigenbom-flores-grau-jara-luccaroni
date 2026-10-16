import Entrega from "../models/Entrega.js";

// matias: lista todas las entregas
export const obtenerEntregas = async (req, res, next) => {
  try {
    const entregas = await Entrega.find().sort({ createdAt: -1 });
    res.status(200).json(entregas);
  } catch (error) {
    next(error);
  }
};

// matias: busca una entrega por id
export const obtenerEntregaPorId = async (req, res, next) => {
  try {
    const entrega = await Entrega.findById(req.params.id);
    if (!entrega) {
      return res.status(404).json({ error: "Entrega no encontrada" });
    }
    res.status(200).json(entrega);
  } catch (error) {
    next(error);
  }
};

// matias: crea una nueva entrega
export const crearEntrega = async (req, res, next) => {
  try {
    const { cliente, direccion, estado } = req.body;
    const nuevaEntrega = new Entrega({ cliente, direccion, estado });
    await nuevaEntrega.save();
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    next(error);
  }
};

// matias: actualiza una entrega por id
export const actualizarEntrega = async (req, res, next) => {
  try {
    const { cliente, direccion, estado } = req.body;
    const datosActualizar = { cliente, direccion };
    if (estado !== undefined) {
      datosActualizar.estado = estado;
    }
    const entregaActualizada = await Entrega.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true, runValidators: true }
    );
    if (!entregaActualizada) {
      return res.status(404).json({ error: "Entrega no encontrada" });
    }
    res.status(200).json(entregaActualizada);
  } catch (error) {
    next(error);
  }
};

// matias: elimina una entrega por id
export const eliminarEntrega = async (req, res, next) => {
  try {
    const entregaEliminada = await Entrega.findByIdAndDelete(req.params.id);
    if (!entregaEliminada) {
      return res.status(404).json({ error: "Entrega no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
