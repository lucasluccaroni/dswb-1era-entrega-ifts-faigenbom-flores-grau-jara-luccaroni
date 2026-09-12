const express = require("express");
const router = express.Router();

const {
  obtenerVehiculos,
  obtenerVehiculoPorId, 
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
} = require("../controllers/vehiculosController");

const validarVehiculo = require("../middleware/validarVehiculo");

//mauro: ruta para listar todos los vehiculos
router.get("/", obtenerVehiculos);

//mauro: ruta para obtener un vehiculo por su ID
router.get("/:id", obtenerVehiculoPorId);

//mauro: ruta para crear un nuevo vehiculo
router.post("/", validarVehiculo, crearVehiculo);

//mauro: ruta para actualizar un vehiculo
router.put("/:id", validarVehiculo, actualizarVehiculo);

//mauro: ruta para eliminar un vehiculo
router.delete("/:id", eliminarVehiculo);

module.exports = router;