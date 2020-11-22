//Importando AXIOS
const axios = require('axios');

const jwt = require('jsonwebtoken');

//FUNÇÕES GLOBAIS
//Função que verifica se determinado valor está em branco ou só com espaços
function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

// Verifica se é um Número
function ValidationNumber(value) {
    return isNaN(value);
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
    
    return resposta == 1 ?  true : false
}

//Faz a validação e inserção no banco de dados de um novo cadastro de pacientes
exports.postPaciente = async (req, res, next) => {
    // Laço que verifica se todos os campos possuem valor
    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    //Verifica o tamanho do campo telefone
    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    //Verifica o tamanho do campo rg
    if (req.body.rg.length < 9) {
        return res.status(500).send({
            error: "errotamanhorg"
        })
    }

    //Verifica se o email é valido
    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    //Verifica o tamanho do campo CPF
    if (req.body.cpf.length < 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    //Verifica o tamanho do campo celular
    if (req.body.celular.length < 13 && req.body.celular.length > 15) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (ValidationNumber(req.body.rg)) {
        return res.status(500).send({
            error: "errorginvalido"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (!await validateCPF(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }
    next();
}

//Faz verificação no banco de dados de um paciente cadastrado, usando seu CPF
exports.getPaciente = (req, res, next) => {

    //Verifica o tamanho do campo CPF
    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }
    
    next();
}

//Atualiza os dados de um determinado paciente
exports.patchPaciente = (req, res, next) => {
    
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

    //Verifica o tamanho do campo telefone
    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    //Verifica o tamanho do campo CPF
    if (req.body.cpf.length < 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    //Verifica o tamanho do campo celular
    if (req.body.celular.length < 10) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }
    next();
}

//Deleta os dados de um determinado paciente
exports.deletePaciente = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfvazio"
        })
    }

    //Verifica o tamanho do campo CPF
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
    next();
}

//Faz a autenticação de um paciente e gera um token
exports.logarPaciente = (req, res, next) => {

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