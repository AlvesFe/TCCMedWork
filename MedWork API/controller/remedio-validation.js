/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Remedio do projeto MEDWORK,
    Toda manipulação de dados da Remedio feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/


//FUNÇÕES GLOBAIS

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

exports.postRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.preco)) {
        return res.status(500).send({
            error: "erroprecoinvalido"
        })
    }

    next();
}



exports.getRemedio = (req, res, next) => {

    if (isNullOrWhitespace(req.body.codigo)) {
        return res.status(500).send({
            error: "erroidremediovazio"
        })
    }
    next();
}

exports.patchRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.preco)) {
        return res.status(500).send({
            error: "erroprecoinvalido"
        })
    }

    if (req.body.id_Remedio.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremedio"
        })
    }

    next();
}

exports.deleteRemedio = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Remedio)) {
        return res.status(500).send({
            error: "erroidremediovazio"
        })
    }

    if (req.body.id_Remedio.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremedio"
        })
    }
    next();
}