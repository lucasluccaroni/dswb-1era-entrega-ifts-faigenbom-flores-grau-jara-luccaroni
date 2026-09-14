const express = require("express");
const router = express.Router();

const {
  obtenerIncidencias,
  obtenerIncidenciaPorId,
  crearIncidencia,
  actualizarIncidencia,
  eliminarIncidencia
} = require("../controllers/incidenciasController");

const validarIncidencia = require("../middleware/validarIncidencia");

// ivan: ruta para listar todas
router.get("/", obtenerIncidencias);

// ivan: ruta dinamica por id
router.get("/:id", obtenerIncidenciaPorId);

// ivan: ruta creacion con validacion
router.post("/", validarIncidencia, crearIncidencia);

// ivan: ruta para actualizar registro
router.put("/:id", actualizarIncidencia);

// ivan: ruta para eliminar registro
router.delete("/:id", eliminarIncidencia);

module.exports = router;
