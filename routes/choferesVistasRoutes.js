// lucas: rutas vistas de choferes
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  listarChoferesVista,
  crearChoferVista,
  editarChoferVista,
  actualizarChoferVista,
  eliminarChoferVista,
} from "../controllers/choferesVistasController.js";

const router = express.Router();

router.get("/", autorizar("choferes", "ver"), listarChoferesVista);
router.post("/", autorizar("choferes", "crear"), crearChoferVista);
router.get("/:id/editar", autorizar("choferes", "editar"), editarChoferVista);
router.post("/:id/actualizar", autorizar("choferes", "editar"), actualizarChoferVista);
router.post("/:id/eliminar", autorizar("choferes", "eliminar"), eliminarChoferVista);

export default router;
