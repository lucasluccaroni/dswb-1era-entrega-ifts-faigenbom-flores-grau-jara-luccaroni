import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema(
  {
    patente: {
      type: String,
      required: [true, "La patente es obligatoria"],
      trim: true,
      uppercase: true,
      unique: true,
    },
    tipo: {
      type: String,
      required: [true, "El tipo de vehículo es obligatorio"],
      enum: {
        values: ["Camión", "Camioneta", "Furgoneta"],
        message: "El tipo de vehículo debe ser Camión, Camioneta o Furgoneta",
      },
    },
    capacidadKg: {
      type: Number,
      required: [true, "La capacidad en kg es obligatoria"],
      min: [1, "La capacidad en kg debe ser al menos 1 Kg"],
    },
    temperaturaMin: {
      type: Number,
      required: [true, "La temperatura mínima es obligatoria"],
    },
    temperaturaMax: {
      type: Number,
      required: [true, "La temperatura máxima es obligatoria"],
    },
    estado: {
      type: String,
      enum: {
        values: ["Disponible", "En ruta", "Mantenimiento"],
        message: "El estado debe ser Disponible, En ruta o Mantenimiento",
      },
      default: "Disponible",
    },
  },
  { timestamps: true }
);

// el tercer argumento fija el nombre de la coleccion
export default mongoose.model("Vehiculo", vehiculoSchema, "vehiculos");