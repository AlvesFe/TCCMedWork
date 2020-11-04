//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importando AXIOS
const axios = require('axios');

//FUNÇÕES GLOBAIS
// Verifica se é um Número
function ValidationNumber(value) {

    if(isNaN(value)){
        return true;
    }
    return false;
}

function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

//Função que verifica se o email inserido é valido
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

async function validateCNPJ(value) {
    const resposta = await axios({
        method: 'get',
        url: `http://geradorapp.com/api/v1/cnpj/validate/${value}?token=1a77a5b656040aace894962324363778`
    })
    .then((response) => {
        return response.data.status;
    });

    return resposta == 1 ?  true : false
}

exports.postFarmacia = async (req, res, next) => {

    //Laço que verifica se todos os campos possuem valor
    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    //Verifica se o email é valido
    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    //Verifica o tamanho do campo telefone
    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.cnpj.length != 14) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if(ValidationNumber(req.body.telefone)){
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }
    if(ValidationNumber(req.body.cnpj)){
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    if(!await validateCNPJ(req.body.cnpj)){
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }
    next();    
}

exports.getFarmacia = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjvazio"
        })
    }
    
    if (req.body.cnpj.length != 14) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }
    next();
}

exports.patchFarmacia = (req, res, next) => {

    //Laço que verifica se todos os campos possuem valor
    for (let key in req.body) {
        if (!req.body[key]) {
            if (key == "ativo") {
                if (!req.body[key] === 0 || !req.body[key] === 1) {
                    return res.status(500).send({
                        error: "erro" + key + "vazio",
                        errormes: req.body[key]
                    })
                }
            }
            else {
                return res.status(500).send({
                    error: "erro" + key + "vazio",
                    errormes: key
                })
            }
        }
    }

    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.id_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidFarmacia"
        })
    }

    if(ValidationNumber(req.body.telefone)){
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }
    next();
}

exports.deleteFarmacia = (req, res, next) => {

    function isNullOrWhitespace(field) {
        return !field || !field.trim();
    }

    if (isNullOrWhitespace(req.body.id_Farmacia)) {
        return res.status(500).send({
            error: "erroidfarmaciavazio"
        })
    }

    if (req.body.id_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidFarmacia"
        })
    }
    next();
}

exports.logarFarmacia = (req, res, next) => {

    function validateEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (false)
        }
        return (true)
    }

    function isNullOrWhitespace(field) {
        return !field || !field.trim();
    }

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }
    next();
}