const knex = require('../../database/connection');
const jwt = require('jsonwebtoken');
const passwordJWT = require('../passwordJWT');

const checkLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({menagem: "Não autorizado"});
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, passwordJWT);

        const compareId = await knex('usuarios').where("id", id).first()

        if (!compareId) {
            return res.status(404).json({mensagem: "Usuário não encontrado"});
        }

        const { senha, ...usuario } = compareId;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = checkLogin