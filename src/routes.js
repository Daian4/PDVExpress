const express = require('express')
const { listCategories } = require('./controllers/categories')
const {
  registerUser,
  login,
  userUpdate,
  getUser
} = require('./controllers/users')
const checkLogin = require('./middlewares/authorization')
const {
  validateUserDataFields,
  validateEmailAndPasswordFields
} = require('./middlewares/validateUserData')
const { registerCustomer, updateClient, listCostumers, getCostumer } = require('./controllers/clients')
const { registerProduct, deleteProduct, updateproduct, getProduct, listProducts } = require('./controllers/products')
const { registerRequest, listRequests } = require('./controllers/requests')
const multer = require('./multer')
const routes = express()

routes.get('/categoria', listCategories)
routes.post('/usuario', validateUserDataFields, registerUser)
routes.post('/login', validateEmailAndPasswordFields, login)

routes.use(checkLogin)

routes.get('/usuario', getUser)
routes.put('/usuario', validateUserDataFields, userUpdate)

routes.post('/cliente', registerCustomer)
routes.put('/cliente/:id', updateClient)
routes.get('/cliente/:id', getCostumer)
routes.get('/cliente', listCostumers)

routes.post('/produto', multer.single('produto_imagem'), registerProduct)
routes.get('/produto', listProducts)
routes.put('/produto/:id', updateproduct)
routes.get('/produto/:id', getProduct)
routes.delete('/produto/:id', deleteProduct)

routes.post('/pedido', registerRequest)
routes.get('/pedido', listRequests)
module.exports = routes
