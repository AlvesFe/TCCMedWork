//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importando AXIOS
const axios = require('axios');

//FUNÇÕES GLOBAIS

//Função que verifica se o email inserido é valido
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

function isNullOrWhitespace(field) {
    return !field
}

//VALIDA CNPJ ATRAVÉS DE UMA API
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

//Faz a validação e inserção no banco de dados de um novo cadastro da MedWork
exports.postAdmMedwork = async (req, res, next) => {

    //Função que verifica se determinado valor está em branco ou só com espaços
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

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (ValidationNumber(req.body.cnpj)) {
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

exports.getAdmMedWork = (req, res, next) => {

    if (req.body.cnpj_admMedWork.length != 14) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if (ValidationNumber(req.body.cnpj_admMedWork)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    next();
}

exports.patchAdmMedWork = (req, res, next) => {

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
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (ValidationNumber(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    next();
}

exports.deleteAdmMedWork = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjvazio"
        })
    }

    //Verifica o tamanho do campo CNPJ
    if (req.body.cnpj.length < 8) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if (ValidationNumber(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    next();
}

exports.logarAdmMedwork = (req, res, next) => {

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

exports.recuperarSenha = (req, res, next) => {

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
    next();
}

exports.confirmetoken = (req, res, next) => {

    if(isNullOrWhitespace(req.body.token)){
        res.status(500).send({
            error: "errortokenvazio"
        })
    }

    try{
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        res.status(200).send({
            success: "sucessotoken"
        })
    }
    catch(error){
        res.status(500).send({error: "errotokeninvalido"})
    }
}

exports.restSenha = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if(req.body.senha !== req.body.confsenha){
        return res.status(500).send({
            error: "errosenhasnaoconferem"
        })
    }
    next();

}