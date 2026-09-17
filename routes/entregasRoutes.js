const express = require("express");
const router = express.Router();

const {
  obtenerEntregas,
  obtenerEntregaPorId,
  crearEntrega,
  actualizarEntrega,
  eliminarEntrega,
  renderizarVistaEntregas
} = require("../controllers/entregasController");

const validarEntrega = require("../middleware/validarEntrega");

// matias: ruta para vista pug
router.get("/vista", renderizarVistaEntregas);

// matias: ruta para listar todos
router.get("/", obtenerEntregas);

// matias: ruta dinamica por id
router.get("/:id", obtenerEntregaPorId);

// matias: ruta creacion con validacion
router.post("/", validarEntrega, crearEntrega);

// matias: ruta para actualizar registro
router.put("/:id", actualizarEntrega);

// matias: ruta para eliminar registro
router.delete("/:id", eliminarEntrega);

module.exports = router;
