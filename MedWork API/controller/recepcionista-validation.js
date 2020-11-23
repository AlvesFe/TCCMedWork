/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Recepcionista do projeto MEDWORK,
    Toda manipulação de dados do Recepcionista feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/
//Importando AXIOS
const axios = require('axios');

const jwt = require('jsonwebtoken')

//FRUNÇÕE GLOBAIS

function isNullOrWhitespace(field) {
    return !field
}

// Verifica se é um Número
function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

//Função que verifica se o email inserido é valido
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

async function validateCPF(value) {

    const resposta = await axios({
        method: 'get',
        url: `http://geradorapp.com/api/v1/cpf/validate/${value}?token=${process.env.CPF_TOKEN}`
    })
        .then((response) => {
            return response.data.status;
        });

    return resposta == 1 ? true : false
}

exports.postRecepcionista = async (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.cpf.length < 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.rg.length < 9) {
        return res.status(500).send({
            error: "errotamanhorg"
        })
    }

    if (ValidationNumber(req.body.rg)) {
        return res.status(500).send({
            error: "errorginvalido"
        })
    }

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    if (req.body.celular.length < 11) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }

    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if(!await validateCPF(req.body.cpf)){
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    next();
}

exports.getRecepcionista = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfvazio"
        })
    }
    next();
}

exports.patchRecepcionista = (req, res, next) => {

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

    if (req.body.celular.length < 11) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }

    if (req.body.telefone.length < 11) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.id_Recepcionista.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidrecepcionista"
        })
    }
    next();
}

exports.deleteRecepcionista = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Recepcionista)) {
        return res.status(500).send({
            error: "erroidrecepcionistavazio"
        })
    }

    if (req.body.id_Recepcionista.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidrecepcionista"
        })
    }

    next();
}

exports.LogarRecepcionista = (req, res, next) => {

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

exports.resetsenha = (req, res, next) => {

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