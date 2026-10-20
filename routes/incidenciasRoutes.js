// ivan: rutas api de incidencias
import express from "express";
import {
  obtenerIncidencias,
  obtenerIncidenciaPorId,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia,
} from "../controllers/incidenciasController.js";
import validarIncidencia from "../middlewares/validarIncidencia.js";

const router = express.Router();

router.get("/", obtenerIncidencias);
router.get("/:id", obtenerIncidenciaPorId);
router.post("/", validarIncidencia, crearIncidencia);
router.put("/:id", validarIncidencia, actualizarIncidencia);
router.delete("/:id", eliminarIncidencia);

export default router;