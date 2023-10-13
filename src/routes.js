const express = require("express");
const { listCategories } = require("./controllers/categories");
const { registerUser, login, getUser } = require("./controllers/users");
const checkLogin = require("./middlewares/authorization");
const {
  validateUserDataFields,
  validateEmailAndPasswordFields,
} = require("./middlewares/validateUserData");
const routes = express();

routes.get("/categoria", listCategories);
routes.post("/usuario", validateUserDataFields, registerUser);
routes.post("/login", validateEmailAndPasswordFields, login);

routes.use(checkLogin);

routes.get("/usuario", getUser);

module.exports = routes;
