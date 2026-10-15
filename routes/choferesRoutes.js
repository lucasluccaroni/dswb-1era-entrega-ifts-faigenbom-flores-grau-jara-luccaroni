import express from "express";
import {
  obtenerChoferes,
  obtenerChoferPorId,
  crearChofer,
  actualizarChofer,
  eliminarChofer,
} from "../controllers/choferesController.js";
import validarChofer from "../middlewares/validarChofer.js";

const router = express.Router();

router.get("/", obtenerChoferes);
router.get("/:id", obtenerChoferPorId);
router.post("/", validarChofer, crearChofer);
router.put("/:id", validarChofer, actualizarChofer);
router.delete("/:id", eliminarChofer);

export default router;
