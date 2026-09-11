// mauro: representa un vehiculo de la flota
class vehiculo {
    constructor(id, patente, tipo, capacidadKg, temperaturaMin, temperaturaMax, estado) {
        this.id = id;
        this.patente = patente;
        this.tipo = tipo;
        this.capacidadKg = capacidadKg;
        this.temperaturaMin = temperaturaMin;
        this.temperaturaMax = temperaturaMax;
        this.estado = estado;
    }
}
module.exports = vehiculo;
