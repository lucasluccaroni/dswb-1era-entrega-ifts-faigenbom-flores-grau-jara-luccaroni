// ivan: rutas vistas de incidencias
import express from "express";
import {
  listarIncidenciasVista,
  crearIncidenciaVista,
  editarIncidenciaVista,
  actualizarIncidenciaVista,
  eliminarIncidenciaVista,
} from "../controllers/incidenciasVistasController.js";

const router = express.Router();

router.get("/", listarIncidenciasVista);
router.post("/", crearIncidenciaVista);
router.get("/:id/editar", editarIncidenciaVista);
router.post("/:id/actualizar", actualizarIncidenciaVista);
router.post("/:id/eliminar", eliminarIncidenciaVista);

export default router;