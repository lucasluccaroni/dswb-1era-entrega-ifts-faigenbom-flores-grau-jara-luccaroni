import express from "express";
import {
  obtenerVehiculosPorId,
  listarVehiculosVista,
  crearVehiculoVista,
  editarVehiculoVista,
  actualizarVehiculoVista,
  eliminarVehiculoVista,
} from "../controllers/vehiculosVistasController.js";

const router = express.Router();

router.get("/:id", obtenerVehiculosPorId);
router.get("/", listarVehiculosVista);
router.post("/", crearVehiculoVista);
router.get("/:id/editar", editarVehiculoVista);
router.post("/:id/actualizar", actualizarVehiculoVista);
router.post("/:id/eliminar", eliminarVehiculoVista);

export default router;