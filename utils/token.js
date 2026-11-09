import jwt from "jsonwebtoken";

// matias: firma jwt del usuario
export const generarToken = (usuario) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Falta JWT_SECRET en el archivo .env");
  }
  return jwt.sign(
    { sub: String(usuario._id), rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

// matias: valida jwt y devuelve payload
export const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
