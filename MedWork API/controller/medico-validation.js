/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Medico do projeto MEDWORK,
    Toda manipulação de dados da Medico feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/
//Importando AXIOS
const axios = require('axios');
const jwt = require('jsonwebtoken')

//FUNÇÕES GLOBAIS
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

exports.postMedico = async (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.crm.legth < 6) {
        return res.status(500).send({
            error: "errotamanhocrm"
        })
    }

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
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

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.cpf.length !== 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if(!await validateCPF(req.body.cpf)){
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (req.body.rg.length !== 9) {
        return res.status(500).send({
            error: "errotamanhorg"
        })
    }

    if (ValidationNumber(req.body.rg)) {
        return res.status(500).send({
            error: "errorginvalido"
        })
    }
    next();
}

exports.getMedico = (req, res, next) => {

    if (isNullOrWhitespace(req.body.crm)) {
        return res.status(500).send({
            error: "errocrmvazio"
        })
    }
    next();
}

exports.patchMedico = (req, res, next) => {

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

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (req.body.celular.length < 11) {
        return res.status(500).send({
            error: "errotamanhoceleular"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "erroceleularnvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }
    next();
}

exports.deleteMedico = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Medico)) {
        return res.status(500).send({
            error: "erroidmedicovazio"
        })
    }

    if (req.body.id_Medico.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidmedico"
        })
    }
    next();
}

exports.logarMedico = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
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

exports.confirmetoken = (req, res, next) => {

    if(isNullOrWhitespace(req.body.token)){
        res.status(500).send({
            error: "errortokenvazio"
        })
    }
    try{
        console.log(req.body.token);
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        res.status(200).send({
            success: "sucessotoken"
        })
    }
    catch(error){
        res.status(500).send({error: "errotokeninvalido"})
    }
}