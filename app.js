import express from "express";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { protegerVistas } from "./middlewares/protegerVistas.js";
import { protegerApi } from "./middlewares/protegerApi.js";
import { exponerUsuario } from "./middlewares/exponerUsuario.js";
import { asegurarAdminInicial } from "./config/adminInicial.js";

import choferesRoutes from "./routes/choferesRoutes.js";
import choferesVistasRoutes from "./routes/choferesVistasRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import usuariosVistasRoutes from "./routes/usuariosVistasRoutes.js";
import vehiculosRoutes from "./routes/vehiculosRoutes.js";
import vehiculosVistasRoutes from "./routes/vehiculosVistasRoutes.js";
import rutasRoutes from "./routes/rutasRoutes.js";
import rutasVistasRoutes from "./routes/rutasVistasRoutes.js";
import entregasRoutes from "./routes/entregasRoutes.js";
import entregasVistasRoutes from "./routes/entregasVistasRoutes.js";
import incidenciasRoutes from "./routes/incidenciasRoutes.js";
import incidenciasVistasRoutes from "./routes/incidenciasVistasRoutes.js";
import usuariosAdminRoutes from "./routes/usuariosAdminRoutes.js";
import usuariosAdminVistasRoutes from "./routes/usuariosAdminVistasRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// las vistas muestran los links de registro solo si esta habilitado
app.locals.registroPublico = process.env.REGISTRO_PUBLICO === "true";

// middlewares globales de lectura de cuerpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// motor de vistas pug
app.set("view engine", "pug");
app.set("views", "./views");

// ---------------------------------------------------------------
// RUTAS PUBLICAS (no requieren sesion ni token)
// ---------------------------------------------------------------
app.get("/api", (req, res) => {
  res.status(200).json({
    api: "FreshRoute B2B",
    recursos: [
      "/api/usuarios",
      "/api/choferes",
      "/api/vehiculos",
      "/api/rutas",
      "/api/entregas",
      "/api/incidencias",
      "/api/admin/usuarios",
    ],
  });
});
app.use("/api/usuarios", usuariosRoutes); // registro y login de la API
app.use("/", usuariosVistasRoutes); // /login, /registro y /logout de las vistas

// ---------------------------------------------------------------
// RUTAS PROTEGIDAS DE VISTAS (protegerVistas: sesion con cookie)
// ---------------------------------------------------------------
app.get("/", protegerVistas, exponerUsuario, (req, res) => {
  res.status(200).render("inicio", { titulo: "Inicio" });
});
app.use("/choferes", protegerVistas, exponerUsuario, choferesVistasRoutes);
app.use("/vehiculos", protegerVistas, exponerUsuario, vehiculosVistasRoutes);
app.use("/rutas", protegerVistas, exponerUsuario, rutasVistasRoutes);
app.use("/entregas", protegerVistas, exponerUsuario, entregasVistasRoutes);
app.use("/incidencias", protegerVistas, exponerUsuario, incidenciasVistasRoutes);
app.use("/usuarios", protegerVistas, exponerUsuario, usuariosAdminVistasRoutes); // solo admin (autorizar)

// ---------------------------------------------------------------
// RUTAS PROTEGIDAS DE LA API (protegerApi: JWT en el header)
// ---------------------------------------------------------------
app.use("/api/choferes", protegerApi, choferesRoutes);
app.use("/api/vehiculos", protegerApi, vehiculosRoutes);
app.use("/api/rutas", protegerApi, rutasRoutes);
app.use("/api/entregas", protegerApi, entregasRoutes);
app.use("/api/incidencias", protegerApi, incidenciasRoutes);
app.use("/api/admin/usuarios", protegerApi, usuariosAdminRoutes); // solo admin (autorizar)

// siempre al final, en este orden
app.use(notFound);
app.use(errorHandler);

await conectarDB();
await asegurarAdminInicial();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
