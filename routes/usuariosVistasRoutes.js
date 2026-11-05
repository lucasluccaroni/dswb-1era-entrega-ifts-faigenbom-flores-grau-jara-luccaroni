// lucas: rutas vistas login y registro
import express from "express";
import { protegerVistas } from "../middlewares/protegerVistas.js";
import { registroPublico } from "../middlewares/registroPublico.js";
import {
  mostrarRegistroVista,
  procesarRegistroVista,
  mostrarLoginVista,
  procesarLoginVista,
  procesarLogoutVista,
} from "../controllers/usuariosVistasController.js";

const router = express.Router();

router.get("/registro", registroPublico, mostrarRegistroVista);
router.post("/registro", registroPublico, procesarRegistroVista);
router.get("/login", mostrarLoginVista);
router.post("/login", procesarLoginVista);
router.post("/logout", protegerVistas, procesarLogoutVista);

export default router;
