import crypto from "crypto";
import Usuario from "../models/Usuario.js";
import { leerCookies } from "./cookies.js";

const DURACION_SESION_MS = 60 * 60 * 1000;

// lucas: crea sesion y envia cookie
export const crearSesion = async (res, usuario) => {
  const token = crypto.randomBytes(32).toString("hex");
  usuario.sesionToken = token;
  usuario.sesionExpira = new Date(Date.now() + DURACION_SESION_MS);
  await usuario.save();

  res.cookie("sesion", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: DURACION_SESION_MS,
  });
};

// lucas: borra sesion y limpia cookie
export const destruirSesion = async (req, res) => {
  const token = leerCookies(req).sesion;
  if (token) {
    await Usuario.updateOne(
      { sesionToken: token },
      { $set: { sesionToken: null, sesionExpira: null } }
    );
  }
  res.clearCookie("sesion");
};
