// ivan: rutas api de incidencias
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  obtenerIncidencias,
  obtenerIncidenciaPorId,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia,
} from "../controllers/incidenciasController.js";
import validarIncidencia from "../middlewares/validarIncidencia.js";

const router = express.Router();

router.get("/", autorizar("incidencias", "ver"), obtenerIncidencias);
router.get("/:id", autorizar("incidencias", "ver"), obtenerIncidenciaPorId);
router.post("/", autorizar("incidencias", "crear"), validarIncidencia, crearIncidencia);
router.put("/:id", autorizar("incidencias", "editar"), validarIncidencia, actualizarIncidencia);
router.delete("/:id", autorizar("incidencias", "eliminar"), eliminarIncidencia);

export default router;