// matias: rutas api de entregas
import express from "express";
import {
  obtenerEntregas,
  obtenerEntregaPorId,
  crearEntrega,
  actualizarEntrega,
  eliminarEntrega,
} from "../controllers/entregasController.js";
import validarEntrega from "../middlewares/validarEntrega.js";

const router = express.Router();

router.get("/", obtenerEntregas);
router.get("/:id", obtenerEntregaPorId);
router.post("/", validarEntrega, crearEntrega);
router.put("/:id", validarEntrega, actualizarEntrega);
router.delete("/:id", eliminarEntrega);

export default router;
