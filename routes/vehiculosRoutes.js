import express from "express";
import { autorizar } from "../middlewares/autorizarRol.js";
import {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from "../controllers/vehiculosController.js";
import validarVehiculo from "../middlewares/validarVehiculo.js";

const router = express.Router();

router.get("/", autorizar("vehiculos", "ver"), obtenerVehiculos);
router.get("/:id", autorizar("vehiculos", "ver"), obtenerVehiculoPorId);
router.post("/", autorizar("vehiculos", "crear"), validarVehiculo, crearVehiculo);
router.put("/:id", autorizar("vehiculos", "editar"), validarVehiculo, actualizarVehiculo);
router.delete("/:id", autorizar("vehiculos", "eliminar"), eliminarVehiculo);

export default router;