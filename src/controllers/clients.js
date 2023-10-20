const knex = require('../../database/connection')

const registerCustomer = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body

  if (!nome || !email || !cpf) {
    return res
      .status(400)
      .json({ message: 'Os campos: (nome, email e cpf) são obrigatórios' })
  }

  try {
    const existingEmail = await knex('clientes').where({ email }).first()
    const existingCpf = await knex('clientes').where({ cpf }).first()

    if (existingEmail || existingCpf) {
      return res
        .status(400)
        .json({ message: 'Email e/ou Cpf já estão cadastrados' })
    }

    const customer = await knex('clientes')
      .insert({
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
      })
      .returning('*')

    if (!customer) {
      return res.status(400).json({ mensagem: 'Cliente não cadastrado' })
    }
    return res.status(201).json(customer)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  if (!nome || !email || !cpf) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const existingClient = await knex("clientes").where("id", id).first();

    if (!existingClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const clientWithSameEmail = await knex("clientes")
      .where("email", email)
      .whereNot("id", id)
      .first();

    if (clientWithSameEmail) {
      return res
        .status(400)
        .json({ mensagem: "E-mail já está em uso por outro cliente" });
    }

    const clientWithSameCpf = await knex("clientes")
      .where("cpf", cpf)
      .whereNot("id", id)
      .first();

    if (clientWithSameCpf) {
      return res
        .status(400)
        .json({ mensagem: "CPF já está em uso por outro cliente" });
    }

    await knex("clientes").where("id", id).update({ nome, email, cpf,  cep, rua, numero, bairro, cidade, estado});

    return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = { 
  registerCustomer,
  updateClient,
}
