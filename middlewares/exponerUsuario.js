// lucas: expone el usuario a las vistas pug
export const exponerUsuario = (req, res, next) => {
  res.locals.usuario = req.usuario ?? null;
  next();
};
