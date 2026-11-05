// judith: rutas api de rutas
import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  obtenerRutas,
  obtenerRutaPorId,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
} from "../controllers/rutasController.js";
import validarRuta from "../middlewares/validarRuta.js";

const router = express.Router();

router.get("/", autorizar("rutas", "ver"), obtenerRutas);
router.get("/:id", autorizar("rutas", "ver"), obtenerRutaPorId);
router.post("/", autorizar("rutas", "crear"), validarRuta, crearRuta);
router.put("/:id", autorizar("rutas", "editar"), validarRuta, actualizarRuta);
router.delete("/:id", autorizar("rutas", "eliminar"), eliminarRuta);

export default router;