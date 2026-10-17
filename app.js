import express from "express";
import dotenv from "dotenv";
import { conectarDB } from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares globales de lectura de cuerpo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// motor de vistas pug
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.status(200).render("inicio", { titulo: "Inicio" });
});

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
    ],
  });
});

app.use("/api/usuarios", usuariosRoutes);
app.use("/", usuariosVistasRoutes);
app.use("/api/choferes", choferesRoutes);
app.use("/choferes", choferesVistasRoutes);
app.use("/api/vehiculos", vehiculosRoutes);

app.use("/vehiculos", vehiculosVistasRoutes);
app.use("/api/rutas", rutasRoutes);
app.use("/rutas", rutasVistasRoutes);
app.use("/api/entregas", entregasRoutes);
app.use("/entregas", entregasVistasRoutes);
app.use("/api/incidencias", incidenciasRoutes);
app.use("/incidencias", incidenciasVistasRoutes);

// siempre al final, en este orden
app.use(notFound);
app.use(errorHandler);

await conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
