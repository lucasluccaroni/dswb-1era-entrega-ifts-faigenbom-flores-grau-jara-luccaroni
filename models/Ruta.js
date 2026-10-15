import mongoose from "mongoose";

const rutaSchema = new mongoose.Schema(
  {
    choferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chofer",
      required: [true, "El chofer es obligatorio"],
    },
    vehiculoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehiculo",
      required: [true, "El vehículo es obligatorio"],
    },
    fecha: {
      type: Date,
      required: [true, "La fecha es obligatoria"],
    },
    horaInicio: {
      type: String,
      required: [true, "La hora de inicio es obligatoria"],
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe tener formato HH:MM"],
    },
    horaFinEstimada: {
      type: String,
      required: [true, "La hora de fin estimada es obligatoria"],
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "La hora debe tener formato HH:MM"],
    },
    estado: {
      type: String,
      enum: ["pendiente", "en_progreso", "finalizada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

// judith: crea modelo de rutas
export default mongoose.model("Ruta", rutaSchema, "rutas");