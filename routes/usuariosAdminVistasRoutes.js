// lucas: rutas vistas gestion de usuarios
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  listarUsuariosVista,
  crearUsuarioVista,
  cambiarRolVista,
  cambiarPasswordVista,
  eliminarUsuarioVista,
} from "../controllers/usuariosAdminVistasController.js";

const router = express.Router();

router.get("/", autorizar("usuarios", "ver"), listarUsuariosVista);
router.post("/", autorizar("usuarios", "crear"), crearUsuarioVista);
router.post("/:id/rol", autorizar("usuarios", "editar"), cambiarRolVista);
router.post("/:id/password", autorizar("usuarios", "editar"), cambiarPasswordVista);
router.post("/:id/eliminar", autorizar("usuarios", "eliminar"), eliminarUsuarioVista);

export default router;
