import express from "express";
import {
  listarRutasVista,
  crearRutaVista,
  editarRutaVista,
  actualizarRutaVista,
  eliminarRutaVista,
} from "../controllers/rutasVistasController.js";

const router = express.Router();

router.get("/", listarRutasVista);
router.post("/", crearRutaVista);
router.get("/:id/editar", editarRutaVista);
router.post("/:id/actualizar", actualizarRutaVista);
router.post("/:id/eliminar", eliminarRutaVista);

export default router;