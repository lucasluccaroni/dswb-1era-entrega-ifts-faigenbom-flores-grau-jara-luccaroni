import express from "express";
import {
  obtenerRutas,
  obtenerRutaPorId,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
} from "../controllers/rutasController.js";
import validarRuta from "../middlewares/validarRuta.js";

const router = express.Router();

router.get("/", obtenerRutas);
router.get("/:id", obtenerRutaPorId);
router.post("/", validarRuta, crearRuta);
router.put("/:id", validarRuta, actualizarRuta);
router.delete("/:id", eliminarRuta);

export default router;