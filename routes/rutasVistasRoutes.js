// judith: rutas vistas de rutas
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  listarRutasVista,
  crearRutaVista,
  editarRutaVista,
  actualizarRutaVista,
  eliminarRutaVista,
} from "../controllers/rutasVistasController.js";

const router = express.Router();

router.get("/", autorizar("rutas", "ver"), listarRutasVista);
router.post("/", autorizar("rutas", "crear"), crearRutaVista);
router.get("/:id/editar", autorizar("rutas", "editar"), editarRutaVista);
router.post("/:id/actualizar", autorizar("rutas", "editar"), actualizarRutaVista);
router.post("/:id/eliminar", autorizar("rutas", "eliminar"), eliminarRutaVista);

export default router;