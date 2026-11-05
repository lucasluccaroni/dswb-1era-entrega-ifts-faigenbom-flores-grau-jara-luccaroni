// lucas: crea o promueve un usuario admin
import dotenv from "dotenv";
import mongoose from "mongoose";
import { conectarDB } from "../config/db.js";
import Usuario from "../models/Usuario.js";
import { hashearPassword } from "../utils/password.js";

dotenv.config();

const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NOMBRE = "Administrador" } = process.env;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Faltan ADMIN_EMAIL y ADMIN_PASSWORD en el archivo .env");
  process.exit(1);
}

await conectarDB();

const email = ADMIN_EMAIL.toLowerCase().trim();
const { salt, passwordHash } = await hashearPassword(ADMIN_PASSWORD);

// si el email existe, lo promueve y le cambia la contraseña
await Usuario.updateOne(
  { email },
  { $set: { nombre: ADMIN_NOMBRE, passwordHash, salt, rol: "admin" } },
  { upsert: true, runValidators: true, setDefaultsOnInsert: true }
);

console.log(`Admin listo: ${email}`);
await mongoose.disconnect();
