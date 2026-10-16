// lucas: rutas vistas login y registro
import express from "express";
import {
  mostrarRegistroVista,
  procesarRegistroVista,
  mostrarLoginVista,
  procesarLoginVista,
} from "../controllers/usuariosVistasController.js";

const router = express.Router();

router.get("/registro", mostrarRegistroVista);
router.post("/registro", procesarRegistroVista);
router.get("/login", mostrarLoginVista);
router.post("/login", procesarLoginVista);

export default router;
