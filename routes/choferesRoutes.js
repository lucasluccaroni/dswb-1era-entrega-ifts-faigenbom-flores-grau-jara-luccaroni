// lucas: rutas api de choferes
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  obtenerChoferes,
  obtenerChoferPorId,
  crearChofer,
  actualizarChofer,
  eliminarChofer,
} from "../controllers/choferesController.js";
import validarChofer from "../middlewares/validarChofer.js";

const router = express.Router();

router.get("/", autorizar("choferes", "ver"), obtenerChoferes);
router.get("/:id", autorizar("choferes", "ver"), obtenerChoferPorId);
router.post("/", autorizar("choferes", "crear"), validarChofer, crearChofer);
router.put("/:id", autorizar("choferes", "editar"), validarChofer, actualizarChofer);
router.delete("/:id", autorizar("choferes", "eliminar"), eliminarChofer);

export default router;
