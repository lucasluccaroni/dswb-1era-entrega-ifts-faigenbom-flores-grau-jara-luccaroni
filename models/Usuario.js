// lucas: modelo usuario esquema mongoose
import mongoose from "mongoose";

export const ROLES = ["admin", "operador"];

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    // los tres campos siguientes no salen en las consultas salvo pedido explicito (+campo)
    passwordHash: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      select: false,
    },
    salt: {
      type: String,
      default: "",
      select: false,
    },
    rol: {
      type: String,
      enum: {
        values: ROLES,
        message: "El rol debe ser admin u operador",
      },
      default: "operador",
    },
    sesionToken: {
      type: String,
      default: null,
      select: false,
    },
    sesionExpira: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", usuarioSchema, "usuarios");
