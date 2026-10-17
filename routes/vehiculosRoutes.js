import express from "express";
import {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from "../controllers/vehiculosController.js";
import validarVehiculo from "../middlewares/validarVehiculo.js";

const router = express.Router();

router.get("/", obtenerVehiculos);
router.get("/:id", obtenerVehiculoPorId);
router.post("/", validarVehiculo, crearVehiculo);
router.put("/:id", validarVehiculo, actualizarVehiculo);
router.delete("/:id", eliminarVehiculo);

export default router;