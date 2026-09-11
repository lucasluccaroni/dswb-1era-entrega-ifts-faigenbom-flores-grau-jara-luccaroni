// matias: define clase modelo entrega
class Entrega {
  constructor(id, cliente, direccion, estado) {
    this.id = id;
    this.cliente = cliente;
    this.direccion = direccion;
    this.estado = estado;
  }
}

module.exports = Entrega;
