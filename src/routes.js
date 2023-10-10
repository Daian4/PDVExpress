const express = require("express");

const routes = express();

routes.get("/", (req, res) => {
  return res.json("tudo certo");
});

module.exports = routes;
