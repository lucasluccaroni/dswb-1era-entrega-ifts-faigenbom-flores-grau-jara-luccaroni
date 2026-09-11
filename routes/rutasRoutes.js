const express = require("express");
const router = express.Router();

const {
    obtenerRutas,
    obtenerRutaPorId,
    crearRuta,
    actualizarRuta,
    eliminarRuta,
} = require("../controllers/rutasController");

const validarRuta = require("../middleware/validarRuta");

// judith: obtiene todas las rutas
router.get("/", obtenerRutas);

// judith: obtiene ruta por id
router.get("/:id", obtenerRutaPorId);

// judith: crea una nueva ruta con validacion de campos requeridos
router.post("/", validarRuta, crearRuta);

// judith: actualiza una ruta existente con validacion de campos requeridos
router.put("/:id", validarRuta, actualizarRuta);

// judith: elimina una ruta
router.delete("/:id", eliminarRuta);

module.exports = router;