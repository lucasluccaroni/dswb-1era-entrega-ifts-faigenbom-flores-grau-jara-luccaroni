import Usuario from "../models/Usuario.js";
import { hashearPassword } from "../utils/password.js";

// lucas: crea el primer admin si no hay
export const asegurarAdminInicial = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NOMBRE = "Administrador" } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return;
    }

    if (await Usuario.exists({ rol: "admin" })) {
      return;
    }

    const email = ADMIN_EMAIL.toLowerCase().trim();
    const { salt, passwordHash } = await hashearPassword(ADMIN_PASSWORD);
    await Usuario.updateOne(
      { email },
      { $set: { nombre: ADMIN_NOMBRE, passwordHash, salt, rol: "admin" } },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    console.log(`Admin inicial creado: ${email}`);
  } catch (error) {
    console.error("No se pudo crear el admin inicial:", error.message);
  }
};
