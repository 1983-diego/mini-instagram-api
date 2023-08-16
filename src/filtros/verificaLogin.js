const knex = require("../conexao");
const jwt = require("jsonwebtoken");
const senhaHash = require("../senhaHash");

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado." });
  }

  try {
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, senhaHash);

    const usuarioExiste = await knex("usuarios").where({ id }).first();

    if (!usuarioExiste) {
      return res.status(404).json({ message: "Token inválido" });
    }

    const { senha, ...usuario } = usuarioExiste;

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = verificaLogin;
