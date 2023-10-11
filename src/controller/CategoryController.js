const knex = require("knex");
//const knex = require('../connection')

const listCategory = async (req, res) => {
  try {
    const categories = await knex("categoria");

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = listCategory;
