// ivan: modelo incidencia esquema mongoose
import mongoose from "mongoose";

const incidenciaSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: [true, "El tipo de incidencia es obligatorio"],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
  },
  { timestamps: true }
);

// el tercer argumento fija el nombre de la coleccion
export default mongoose.model("Incidencia", incidenciaSchema, "incidencias");