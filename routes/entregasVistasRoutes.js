// matias: rutas vistas de entregas
import express from "express";
import {
  listarEntregasVista,
  crearEntregaVista,
  editarEntregaVista,
  actualizarEntregaVista,
  eliminarEntregaVista,
} from "../controllers/entregasVistasController.js";

const router = express.Router();

router.get("/", listarEntregasVista);
router.post("/", crearEntregaVista);
router.get("/:id/editar", editarEntregaVista);
router.post("/:id/actualizar", actualizarEntregaVista);
router.post("/:id/eliminar", eliminarEntregaVista);

export default router;
