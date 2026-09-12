//mauro: valida campos obligatorios del vehiculo
const validarVehiculo = (req, res, next) => {
    const { patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado } = req.body;
    if (!patente, tipo, !capacidadKg, !temperaturaMin, !temperaturaMax, !estado) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    next();
}

module.exports = validarVehiculo;

