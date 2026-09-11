const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// configuracion de middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// configuracion del motor pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// modulo de ejemplo activo
const exampleRoutes = require("./routes/exampleRoutes");
app.use("/personas", exampleRoutes);

// rutas modulares del equipo
// const choferesRoutes = require("./routes/choferesRoutes");
// app.use("/choferes", choferesRoutes);

const entregasRoutes = require("./routes/entregasRoutes");
app.use("/entregas", entregasRoutes);

// const incidenciasRoutes = require("./routes/incidenciasRoutes");
// app.use("/incidencias", incidenciasRoutes);

// const rutasRoutes = require("./routes/rutasRoutes");
// app.use("/rutas", rutasRoutes);

// const vehiculosRoutes = require("./routes/vehiculosRoutes");
// app.use("/vehiculos", vehiculosRoutes);

// ruta principal de bienvenida
app.get("/", (req, res) => {
  res.render("layout", { titulo: "Inicio - Sistema Logistico" });
});

// inicio del servidor express
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
