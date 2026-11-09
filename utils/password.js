import crypto from "crypto";

const ITERACIONES = 210000;
const LARGO_CLAVE = 64;
const DIGEST = "sha512";

// mauro: deriva clave con pbkdf2
const derivarClave = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, ITERACIONES, LARGO_CLAVE, DIGEST, (err, clave) => {
      if (err) {
        return reject(err);
      }
      resolve(clave);
    });
  });

// mauro: crea salt y hash
export const hashearPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const clave = await derivarClave(password, salt);
  return { salt, passwordHash: clave.toString("hex") };
};

// mauro: compara password con hash guardado
export const verificarPassword = async (password, usuario) => {
  if (!usuario?.salt || !usuario?.passwordHash) {
    return false;
  }
  const claveCalculada = await derivarClave(password, usuario.salt);
  const claveGuardada = Buffer.from(usuario.passwordHash, "hex");
  if (claveCalculada.length !== claveGuardada.length) {
    return false;
  }
  return crypto.timingSafeEqual(claveCalculada, claveGuardada);
};