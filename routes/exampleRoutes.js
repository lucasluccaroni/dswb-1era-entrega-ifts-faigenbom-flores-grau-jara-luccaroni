const express = require("express");
const router = express.Router();

const {
  obtenerPersonas,
  obtenerPersonaPorId,
  crearPersona,
  actualizarPersona,
  eliminarPersona,
  renderizarVistaPersonas
} = require("../controllers/exampleController");

const validarPersona = require("../middleware/exampleMiddleware");

// lucas: ruta para vista pug
router.get("/vista", renderizarVistaPersonas);

// lucas: ruta para listar todos
router.get("/", obtenerPersonas);

// lucas: ruta dinamica por id
router.get("/:id", obtenerPersonaPorId);

// lucas: ruta creacion con validacion
router.post("/", validarPersona, crearPersona);

// lucas: ruta para actualizar registro
router.put("/:id", actualizarPersona);

// lucas: ruta para eliminar registro
router.delete("/:id", eliminarPersona);

module.exports = router;
