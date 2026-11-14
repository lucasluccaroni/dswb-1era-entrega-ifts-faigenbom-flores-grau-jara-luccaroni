import Chofer from "../models/Chofer.js";
import Vehiculo from "../models/Vehiculo.js";
import Ruta from "../models/Ruta.js";

// judith: verifica que el chofer exista
export const existeChofer = async (id) => Boolean(await Chofer.exists({ _id: id }));

// judith: verifica que el vehiculo exista
export const existeVehiculo = async (id) => Boolean(await Vehiculo.exists({ _id: id }));

// judith: verifica rutas asignadas al chofer
export const choferTieneRutas = async (id) => Boolean(await Ruta.exists({ choferId: id }));

// judith: verifica rutas asignadas al vehiculo
export const vehiculoTieneRutas = async (id) => Boolean(await Ruta.exists({ vehiculoId: id }));
