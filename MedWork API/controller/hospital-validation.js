/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hospital do projeto MEDWORK,
    Toda manipulação de dados do hospital feitas pelo APP ou Site do projeto 
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

exports.postHospital = async (req, res, next) => {

    //Função que verifica se determinado valor está em branco ou só com espaços
    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
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

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

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

    if(!await validateCNPJ(req.body.cnpj)){
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    next();
}

exports.getHospital = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cnpj)) {
        return res.status(500).send({
            error: "erroidhospitalvazio"
        })
    }

    if (req.body.cnpj.length !== 14) {
        return res.status(500).send({
            error: "errotamanhoidhospital"
        })
    }

    next();
}

exports.patchHospital = (req, res, next) => {

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
            error: "errortamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }
    next();
}

exports.deleteHospital = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Hospital)) {
        return res.status(500).send({
            error: "erroridhospitalvazio"
        })
    }

    if (req.body.id_Hospital.length !== 60) {
        return res.status(500).send({
            error: "erroridhospitalinvalido"
        })
    }

    next();
}

exports.logarHospital = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    next();
}

exports.confirmetoken = (req, res ,next) => {

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