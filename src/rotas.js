const express = require("express");
const verificaLogin = require("./filtros/verificaLogin");
const { login } = require("./controladores/login");
const {
  cadastrarUsuario,
  obterPerfil,
  atualizarPerfil,
} = require("./controladores/usuario");
const {
  novaPostagem,
  curtir,
  comentar,
  feed,
} = require("./controladores/postagens");

const rotas = express();

//cadastro de usuario
rotas.post("/cadastro", cadastrarUsuario);

//login
rotas.post("/login", login);

//filtro para verificar usuario logado
rotas.use(verificaLogin);

//obter e atualizar dados do perfil do usuario logado
rotas.get("/perfil", obterPerfil);
rotas.put("/perfil", atualizarPerfil);

//postagens
rotas.post("/postagens", novaPostagem);
rotas.get("/postagens", feed);
rotas.post("/postagens/:postagemId/curtir", curtir);
rotas.post("/postagens/:postagemId/comentar", comentar);

module.exports = rotas;
