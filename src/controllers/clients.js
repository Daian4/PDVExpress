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

module.exports = { registerCustomer }
