class Ruta {
    // judith: define clase modelo ruta
    constructor(id, choferId, vehiculoId, fecha, horaInicio, horaFinEstimada, estado) {
        this.id = id;
        this.choferId = choferId;
        this.vehiculoId = vehiculoId;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFinEstimada = horaFinEstimada;
        this.estado = estado;
    }
}

module.exports = Ruta;