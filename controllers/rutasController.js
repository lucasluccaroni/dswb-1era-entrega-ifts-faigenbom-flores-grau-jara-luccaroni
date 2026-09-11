const fs = require("fs");
const path = require("path");
const Ruta = require("../models/Ruta");

const rutaArchivo = path.join(__dirname, "../data/rutas.json");

// judith: lee archivo json de rutas
const leerRutas = () => {
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    return JSON.parse(data);
};

// judith: guarda array en archivo json
const guardarRutas = (rutas) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(rutas, null, 2));
};

// judith: lista todas las rutas registradas
const obtenerRutas = (req, res) => {
    const rutas = leerRutas();
    res.json(rutas);
};

// judith: obtiene una ruta por id
const obtenerRutaPorId = (req, res) => {
    const rutas = leerRutas();
    const id = parseInt(req.params.id);
    const ruta = rutas.find(ruta => ruta.id === id);

    if (!ruta) {
        return res.status(404).json({
            mensaje: "Ruta no encontrada"
        });
    }

    res.json(ruta);
};


// judith: crea una nueva ruta
const crearRuta = (req, res) => {
    const rutas = leerRutas();
    const {
        id,
        choferId,
        vehiculoId,
        fecha,
        horaInicio,
        horaFinEstimada
    } = req.body;
    const nuevoId = id ? parseInt(id) : Date.now();

    const nuevaRuta = new Ruta(
        nuevoId,
        choferId,
        vehiculoId,
        fecha,
        horaInicio,
        horaFinEstimada,
        "pendiente"
    );
    rutas.push(nuevaRuta);
    guardarRutas(rutas);

    res.status(201).json({
    mensaje: "Ruta creada con exito",
    ruta: nuevaRuta
    });
};

// judith: actualiza una ruta existente
const actualizarRuta = (req, res) => {
    const rutas = leerRutas();
    const id = parseInt(req.params.id);
    const ruta = rutas.find(ruta => ruta.id === id);

    if (!ruta) {
        return res.status(404).json({
            mensaje: "Ruta no encontrada"
        });
    }

    const {
        choferId,
        vehiculoId,
        fecha,
        horaInicio,
        horaFinEstimada
    } = req.body;
    
    ruta.choferId = choferId ?? ruta.choferId;
    ruta.vehiculoId = vehiculoId ?? ruta.vehiculoId;
    ruta.fecha = fecha ?? ruta.fecha;
    ruta.horaInicio = horaInicio ?? ruta.horaInicio;
    ruta.horaFinEstimada = horaFinEstimada ?? ruta.horaFinEstimada;
    ruta.estado = req.body.estado ?? ruta.estado;
    
    guardarRutas(rutas);

    res.json({
        mensaje: "Ruta actualizada con exito",
        ruta
    });
};

// judith: elimina una ruta existente
const eliminarRuta = (req, res) => {
    const rutas = leerRutas();
    const id = parseInt(req.params.id);
    const nuevasRutas = rutas.filter(ruta => ruta.id !== id);

    if (rutas.length === nuevasRutas.length) {
        return res.status(404).json({
            mensaje: "Ruta no encontrada"
        });
    }

    guardarRutas(nuevasRutas);

    res.json({
        mensaje: "Ruta eliminada correctamente"
    });
};

// judith: renderiza vista pug de rutas
const renderizarVistaRutas = (req, res) => {
  const rutas = leerRutas();
  res.render("example", { titulo: "Modulo de Ejemplo - Rutas", rutas });
};

module.exports = {
    obtenerRutas,
    obtenerRutaPorId,
    crearRuta,
    actualizarRuta,
    eliminarRuta,
    renderizarVistaRutas
};