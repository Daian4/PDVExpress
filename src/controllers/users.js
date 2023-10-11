const knex = require("../../database/connection");
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken')
// const passwordJWT = require('')

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
    return res
      .status(400)
      .json({ mensagem: "Preencha todos os campos: nome, email e senha" });
  }

  try {
    const passwordCrypt = await bcrypt.hash(senha, 10);

    const user = await knex("usuarios").where("email", email).first();

    if (user) {
      return res.status(400).json({ mensagem: "Email já existe" });
    }

    const newUser = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: passwordCrypt,
      })
      .returning("*");

    if (!newUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o usuário" });
    }

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = { registerUser };
