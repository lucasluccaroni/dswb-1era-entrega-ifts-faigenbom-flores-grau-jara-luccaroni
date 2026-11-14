const TODAS = ["ver", "crear", "editar", "eliminar"];
const GESTION = ["ver", "crear", "editar"];

// ivan: matriz de permisos por rol
export const PERMISOS = {
  admin: {
    choferes: TODAS,
    vehiculos: TODAS,
    rutas: TODAS,
    entregas: TODAS,
    incidencias: TODAS,
    usuarios: TODAS,
  },
  operador: {
    choferes: ["ver"],
    vehiculos: ["ver"],
    rutas: GESTION,
    entregas: GESTION,
    incidencias: GESTION,
  },
};
