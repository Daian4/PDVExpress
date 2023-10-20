const knex = require('../../database/connection')

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(400).json({
      mensagem:
        'Os campos: (descricao, quantidade_estoque,valor e categoria_id) são obrigatórios'
    })
  }

  try {
    const existingProduct = await knex('produtos').where({ descricao }).first()

    if (existingProduct) {
      return res.status(400).json({
        mensagem: 'Produto já cadastrado'
      })
    }
    const category = await knex('categorias')
      .where({
        id: categoria_id
      })
      .first()

    if (!category) {
      return res.status(400).json({
        mensagem: 'Categoria não encontrada'
      })
    }

    const product = await knex('produtos')
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id: category.id
      })
      .returning('*')

    return res.status(201).json(product)
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro interno no servidor'
    })
  }
}

module.exports = { registerProduct }
