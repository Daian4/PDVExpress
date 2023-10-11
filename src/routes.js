const express = require('express')
const { listCategories } = require('./controllers/categories')
const { registerUser } = require('./controllers/users')
const routes = express()

routes.get('/categoria', listCategories)
routes.post('/usuario', registerUser)

module.exports = routes
