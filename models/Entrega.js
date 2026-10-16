// matias: modelo entrega esquema mongoose
import mongoose from "mongoose";

const entregaSchema = new mongoose.Schema(
  {
    cliente: {
      type: String,
      required: [true, "El cliente es obligatorio"],
      trim: true,
    },
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En camino", "Entregado"],
      default: "Pendiente",
    },
  },
  { timestamps: true }
);

// matias: exporta modelo con coleccion explicita
export default mongoose.model("Entrega", entregaSchema, "entregas");
