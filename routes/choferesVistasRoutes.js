// lucas: rutas vistas de choferes
import express from "express";
import {
  listarChoferesVista,
  crearChoferVista,
  editarChoferVista,
  actualizarChoferVista,
  eliminarChoferVista,
} from "../controllers/choferesVistasController.js";

const router = express.Router();

router.get("/", listarChoferesVista);
router.post("/", crearChoferVista);
router.get("/:id/editar", editarChoferVista);
router.post("/:id/actualizar", actualizarChoferVista);
router.post("/:id/eliminar", eliminarChoferVista);

export default router;
