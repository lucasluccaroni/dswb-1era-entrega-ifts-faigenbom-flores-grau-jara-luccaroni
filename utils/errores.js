// lucas: crea un error con status http
export const crearError = (status, mensaje) => {
  const error = new Error(mensaje);
  error.status = status;
  return error;
};
