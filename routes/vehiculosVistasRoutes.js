import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  obtenerVehiculosPorId,
  listarVehiculosVista,
  crearVehiculoVista,
  editarVehiculoVista,
  actualizarVehiculoVista,
  eliminarVehiculoVista,
} from "../controllers/vehiculosVistasController.js";

const router = express.Router();

router.get("/:id", autorizar("vehiculos", "ver"), obtenerVehiculosPorId);
router.get("/", autorizar("vehiculos", "ver"), listarVehiculosVista);
router.post("/", autorizar("vehiculos", "crear"), crearVehiculoVista);
router.get("/:id/editar", autorizar("vehiculos", "editar"), editarVehiculoVista);
router.post("/:id/actualizar", autorizar("vehiculos", "editar"), actualizarVehiculoVista);
router.post("/:id/eliminar", autorizar("vehiculos", "eliminar"), eliminarVehiculoVista);

export default router;