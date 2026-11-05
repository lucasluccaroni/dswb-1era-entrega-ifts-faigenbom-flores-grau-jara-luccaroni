// lucas: migra passwords de texto plano
import dotenv from "dotenv";
import mongoose from "mongoose";
import { conectarDB } from "../config/db.js";
import Usuario from "../models/Usuario.js";
import { hashearPassword } from "../utils/password.js";

dotenv.config();

await conectarDB();

// corta si hashearPassword todavia es la version provisoria
const prueba = await hashearPassword("prueba");
if (!prueba.salt || prueba.passwordHash === "prueba") {
  console.error("hashearPassword sigue siendo la version provisoria. No se migra nada.");
  await mongoose.disconnect();
  process.exit(1);
}

// usa la coleccion cruda porque el esquema nuevo ya no tiene "password"
const coleccion = Usuario.collection;
const pendientes = await coleccion
  .find({ password: { $exists: true }, passwordHash: { $exists: false } })
  .toArray();

for (const usuario of pendientes) {
  const { salt, passwordHash } = await hashearPassword(usuario.password);
  await coleccion.updateOne(
    { _id: usuario._id },
    { $set: { passwordHash, salt }, $unset: { password: "" } }
  );
}

console.log(`Usuarios migrados: ${pendientes.length}`);
await mongoose.disconnect();
