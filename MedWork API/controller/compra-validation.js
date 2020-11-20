//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÕES GLOBAIS

function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

//Faz a validação e inserção no banco de dados de um novo cadastro da Compra
exports.postCompra = (req, res, next) => {

    for (let key in req.body) {
        if(key !== "valorRecebido" && key !== "valorDevolvido"){
            if (!req.body[key]) {
                return res.status(500).send({
                    error: "erro" + key + "vazio"
                })
            }
        }
    }

    if (req.body.cod_fiscal.length != 40) {
        return res.status(500).send({
            error: "errotamanhocodigofiscal"
        })
    }

    if(ValidationNumber(req.body.quantidade)){
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    if(ValidationNumber(req.body.cod_fiscal)){
        return res.status(500).send({
            error: "errocodfiscalinvalida"
        })
    }

    if(ValidationNumber(req.body.valorRecebido)){
        return res.status(500).send({
            error: "errovalorrecebidoinvalida"
        })
    }
    if(ValidationNumber(req.body.valorDevolvido)){
        return res.status(500).send({
            error: "errovalordevolvidoinvalida"
        })
    }
    next();
}

exports.getCompra = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Compra)) {
        return res.status(500).send({
            error: "erroidcompravazio"
        })
    }

    if (req.body.id_Compra.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidcompra"
        })
    }
    
    next();
}

exports.patchCompra = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.id_Compra.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidcompra"
        })
    }

    if(ValidationNumber(req.body.quantidade)){
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    next();
}

exports.deleteCompra = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Compra)) {
        return res.status(500).send({
            error: "erroidcompravazio"
        })
    }

    if (req.body.id_Compra.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidcompra"
        })
    }

    next();
}