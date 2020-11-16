/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Receita do projeto MEDWORK,
    Toda manipulação de dados da Receita feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/


//FUNÇÕES GLOBAIS

//Função que verifica se determinado valor está em branco ou só com espaços
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

exports.postReceita = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    next();
}



exports.getReceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidreceitavazio"
        })
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}

exports.patchReceita = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}

exports.deleteREceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidreceitavazio"
        })
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}

exports.listReceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Paciente)) {
        return res.status(500).send({
            error: "erroidpacientevazio"
        })
    }

    if (req.body.id_Paciente.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidpaciente"
        })
    }
    next();
}

exports.detalhesReceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidpacientevazio"
        })
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}