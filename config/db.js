import mongoose from "mongoose";

// lucas: conecta la app a mongodb
export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};
