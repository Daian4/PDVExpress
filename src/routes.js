const express = require("express");
const { listCategories } = require("./controllers/categories");
const { registerUser, login } = require("./controllers/users");
const checkLogin = require("./middlewares/authorization");
const routes = express();

routes.get("/categoria", listCategories);
routes.post("/usuario", registerUser);
routes.post("/login", login)

routes.use(checkLogin)

module.exports = routes;
