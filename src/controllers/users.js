const knex = require("../../database/connection");
const bcrypt = require("bcrypt");
const passwordJWT = process.env.passwordJWT;
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const passwordCrypt = await bcrypt.hash(senha, 10);

    const user = await knex("usuarios").where("email", email).first();

    if (user) {
      return res.status(400).json({ mensagem: "O Email já existe" });
    }

    const newUser = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: passwordCrypt,
      })
      .returning(["id", "nome", "email"]);

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

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await knex("usuarios").where("email", email).first();

    if (!user) {
      return res
        .status(400)
        .json({ mensagem: "Email e/ou senha estão incorretos" });
    }

    const correctPassword = await bcrypt.compare(senha, user.senha);

    if (!correctPassword) {
      return res
        .status(400)
        .json({ mensagem: "Email e/ou senha estão incorretos" });
    }

    const token = jwt.sign({ id: user.id }, passwordJWT, { expiresIn: "8h" });

    const { senha: _, ...userData } = user;

    return res.status(200).json({
      usuario: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const getUser = async (req, res) => {
  const { usuario } = req;

  try {
    const userProfile = await knex("usuarios").where("id", usuario.id).first();

    const { senha, ...userDetail } = userProfile;

    return res.status(200).json(userDetail);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const userUpdate = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { usuario } = req;

  try {
    const existingUser = await knex("usuarios")
      .where("email", email)
      .whereNot({ id: usuario.id })
      .first();

    if (existingUser) {
      return res
        .status(400)
        .json({
          mensagem:
            "O email informado já está sendo utilizado por outro usuário",
        });
    }

    const passwordCrypt = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .where("id", usuario.id)
      .update({ nome, email, senha: passwordCrypt });

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

module.exports = {
  registerUser,
  login,
  userUpdate,
  getUser,
};
