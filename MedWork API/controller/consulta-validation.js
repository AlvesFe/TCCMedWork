//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postConsulta = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    next();
}

exports.getConsulta = (req, res, next) => {

    if (!req.body.id_Consulta) {
        return res.status(500).send({
            error: "erroidconsultavazio"
        })
    }

    if (req.body.id_Consulta.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidconsulta"
        })
    }
    next();
}

exports.patchConsulta = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.id_Consulta.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidconsulta"
        })
    }
    next();
}

exports.deleteConsulta = (req, res, next) => {

    if (!req.body.id_Consulta) {
        return res.status(500).send({
            error: "erroidconsultavazio"
        })
    }

    if (req.body.id_Consulta.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidconsulta"
        })
    }
    next();
}