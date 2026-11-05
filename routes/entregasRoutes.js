// matias: rutas api de entregas
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  obtenerEntregas,
  obtenerEntregaPorId,
  crearEntrega,
  actualizarEntrega,
  eliminarEntrega,
} from "../controllers/entregasController.js";
import validarEntrega from "../middlewares/validarEntrega.js";

const router = express.Router();

router.get("/", autorizar("entregas", "ver"), obtenerEntregas);
router.get("/:id", autorizar("entregas", "ver"), obtenerEntregaPorId);
router.post("/", autorizar("entregas", "crear"), validarEntrega, crearEntrega);
router.put("/:id", autorizar("entregas", "editar"), validarEntrega, actualizarEntrega);
router.delete("/:id", autorizar("entregas", "eliminar"), eliminarEntrega);

export default router;
