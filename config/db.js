import mongoose from "mongoose";

// lucas: conecta la app a mongodb
export const conectarDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    if (process.env.VERCEL) {
      throw error;
    }
    process.exit(1);
  }
};
