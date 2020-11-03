/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Remedio_Farmacia do projeto MEDWORK,
    Toda manipulação de dados da Remedio_Farmacia feitas pelo APP ou Site do projeto 
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

exports.postRemedioFarmacia = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.estoque)) {
        return res.status(500).send({
            error: "erroestoqueinvalido"
        })
    }

    next();
}



exports.getRemedioFarmacia = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Remedio_Farmacia)) {
        return res.status(500).send({
            error: "erroidremediofarmaciavazio"
        })
    }

    if (req.body.id_Remedio_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremediofarmacia"
        })
    }

    next();
}

exports.patchRemedioFarmacia = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.estoque)) {
        return res.status(500).send({
            error: "erroestoqueinvalido"
        })
    }

    if (req.body.id_Remedio_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremediofarmacia"
        })
    }
    next();
}

exports.deleteREmedioFarmacia = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Remedio_Farmacia)) {
        return res.status(500).send({
            error: "erroidremediofarmaciavazio"
        })
    }

    if (req.body.id_Remedio_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremediofarmacia"
        })
    }
    next();
}