// lucas: rutas api de usuarios
import express from "express";
import { registrarUsuario, iniciarSesion } from "../controllers/usuariosController.js";
import { validarRegistro, validarLogin } from "../middlewares/validarUsuario.js";

const router = express.Router();

router.post("/registro", validarRegistro, registrarUsuario);
router.post("/login", validarLogin, iniciarSesion);

export default router;
