const express = require("express");
const router = express.Router();

const {
  obtenerChoferes,
  obtenerChoferPorId,
  crearChofer,
  actualizarChofer,
  eliminarChofer
} = require("../controllers/choferesController");

const validarChofer = require("../middleware/validarChofer");

// lucas: ruta para listar todos
router.get("/", obtenerChoferes);

// lucas: ruta dinamica por id
router.get("/:id", obtenerChoferPorId);

// lucas: ruta creacion con validacion
router.post("/", validarChofer, crearChofer);

// lucas: ruta para actualizar registro
router.put("/:id", actualizarChofer);

// lucas: ruta para eliminar registro
router.delete("/:id", eliminarChofer);

module.exports = router;
