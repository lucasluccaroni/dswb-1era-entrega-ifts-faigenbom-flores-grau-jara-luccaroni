// lucas: rutas api gestion de usuarios
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuariosAdminController.js";
import { validarAltaUsuario, validarEdicionUsuario } from "../middlewares/validarUsuarioAdmin.js";

const router = express.Router();

router.get("/", autorizar("usuarios", "ver"), listarUsuarios);
router.post("/", autorizar("usuarios", "crear"), validarAltaUsuario, crearUsuario);
router.put("/:id", autorizar("usuarios", "editar"), validarEdicionUsuario, actualizarUsuario);
router.delete("/:id", autorizar("usuarios", "eliminar"), eliminarUsuario);

export default router;
