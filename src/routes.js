const express = require("express");
const { listCategories } = require("./controllers/categories");
const routes = express();

routes.get("/categoria", listCategories);

module.exports = routes;
