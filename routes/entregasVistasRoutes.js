// matias: rutas vistas de entregas
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  listarEntregasVista,
  crearEntregaVista,
  editarEntregaVista,
  actualizarEntregaVista,
  eliminarEntregaVista,
} from "../controllers/entregasVistasController.js";

const router = express.Router();

router.get("/", autorizar("entregas", "ver"), listarEntregasVista);
router.post("/", autorizar("entregas", "crear"), crearEntregaVista);
router.get("/:id/editar", autorizar("entregas", "editar"), editarEntregaVista);
router.post("/:id/actualizar", autorizar("entregas", "editar"), actualizarEntregaVista);
router.post("/:id/eliminar", autorizar("entregas", "eliminar"), eliminarEntregaVista);

export default router;
