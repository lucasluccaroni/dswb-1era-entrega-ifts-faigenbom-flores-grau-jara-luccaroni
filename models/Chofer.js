// lucas: modelo chofer esquema mongoose
import mongoose from "mongoose";

const choferSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
  },
  { timestamps: true }
);

// el tercer argumento fija el nombre de la coleccion
export default mongoose.model("Chofer", choferSchema, "choferes");
