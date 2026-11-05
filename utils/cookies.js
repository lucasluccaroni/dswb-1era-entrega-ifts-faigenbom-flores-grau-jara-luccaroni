// lucas: convierte el header cookie en objeto
export const leerCookies = (req) => {
  const header = req.headers.cookie;
  if (!header) {
    return {};
  }

  return header.split(";").reduce((cookies, cookie) => {
    const indice = cookie.indexOf("=");
    if (indice === -1) {
      return cookies;
    }
    const nombre = cookie.slice(0, indice).trim();
    const valor = cookie.slice(indice + 1).trim();
    try {
      cookies[nombre] = decodeURIComponent(valor);
    } catch {
      cookies[nombre] = valor;
    }
    return cookies;
  }, {});
};
