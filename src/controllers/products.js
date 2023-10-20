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

const updateproduct = async (req, res) => {
  const { id } = req.params
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(404).json({ mensagem: "Informe ao menos um campo para atualizaçao do produto" })

  }

  try {
    const productId = await knex('produtos').where('id', id).first()

    if (!productId) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const category = await knex('categorias').where({id: categoria_id}).first()

    if (!category) {return res.status(400).json({mensagem: 'Categoria não encontrada'})
    }
    const update = await knex('produtos').where('id', id).update(req.body).returning('*')

    if (!update) {
      return res.status(400).json({ mensagem: 'O produto não foi atualizado' });
    }

    return res.status(200).json({ mensagem: 'produto foi atualizado com sucesso.' });
    
  } catch (error) {
    return res.status(400).json(error.message)
  }

};


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productId = await knex('produtos')
      .where('id', id)
      .first();

    if (!productId) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    const deleteProduct = await knex('produtos')
      .where('id', id)
      .del();

    if (!deleteProduct) {
      return res.status(400).json({ mensagem: 'O Produto não foi deletado' })
    }

    return res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = {
  registerProduct,
  deleteProduct,
  updateproduct
}
