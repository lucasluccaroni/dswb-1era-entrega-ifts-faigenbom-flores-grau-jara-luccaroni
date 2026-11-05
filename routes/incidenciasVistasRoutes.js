// ivan: rutas vistas de incidencias
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  listarIncidenciasVista,
  crearIncidenciaVista,
  editarIncidenciaVista,
  actualizarIncidenciaVista,
  eliminarIncidenciaVista,
} from "../controllers/incidenciasVistasController.js";

const router = express.Router();

router.get("/", autorizar("incidencias", "ver"), listarIncidenciasVista);
router.post("/", autorizar("incidencias", "crear"), crearIncidenciaVista);
router.get("/:id/editar", autorizar("incidencias", "editar"), editarIncidenciaVista);
router.post("/:id/actualizar", autorizar("incidencias", "editar"), actualizarIncidenciaVista);
router.post("/:id/eliminar", autorizar("incidencias", "eliminar"), eliminarIncidenciaVista);

export default router;