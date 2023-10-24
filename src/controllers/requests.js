const knex = require("../../database/connection")

const registerRequest = async (req, res) => {
  const { cliente_id, pedido_produtos, observacao } = req.body

  if (!cliente_id || !pedido_produtos || pedido_produtos.length === 0) {
    return res.status(400).json({
      mensagem:
        "Os campos cliente_id e pedido_produtos são obrigatórios e devem conter pelo menos um pedido",
    })
  }

  try {
    const existingClient = await knex("clientes")
      .where("id", cliente_id)
      .first()

    if (!existingClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" })
    }

    let amount = 0
    for (const product of pedido_produtos) {
      const { produto_id, quantidade_produto } = product
      const existingProduct = await knex("produtos")
        .where("id", produto_id)
        .first()

      if (!existingProduct) {
        return res.status(400).json({
          mensagem: "Não existe produto cadastrado",
        })
      }
      if (existingProduct.quantidade_estoque < quantidade_produto) {
        return res.status(400).json({
          mensagem: "Quantidade em estoque insuficiente",
        })
      }
      amount += existingProduct.valor * quantidade_produto
    }

    const requestClient = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total: amount,
      })
      .returning("id")

    for(const request of pedido_produtos){
        const {produto_id, quantidade_produto} = request

        const product = await knex("produtos")
        .where("id", produto_id)
        .first()
        
        await knex("pedido_produtos").insert({
            pedido_id: requestClient[0].id,
            produto_id,
            quantidade_produto,
            valor_produto: product.valor
          })
    }

    return res.status(201).json({mensagem: "Pedido efetuado com sucesso, aguarde o email."})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = {
  registerRequest,
}
