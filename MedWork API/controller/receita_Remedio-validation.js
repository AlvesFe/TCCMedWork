/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Receita_Remedio do projeto MEDWORK,
    Toda manipulação de dados da Receita_Remedio feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//FUNÇOES GLOBAIS
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

exports.postReceitaRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    if (ValidationNumber(req.body.Quantidade)) {
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }
    next();
}

exports.getReceitaRemedio = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_Receita_Remedio)){
        return res.status(500).send({
            error: "erroidreceitaremediovazio"
        })
    }

    if(req.body.id_Receita_Remedio.length !== 60){
        return res.status(500).send({
            error: "erroidreceitaremedioinvalido"
        })
    }
    next();
}
exports.patchReceitaRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if(ValidationNumber(req.body.Quantidade)){
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    if(req.body.id_Receita_Remedio.length !== 60){
        return res.status(500).send({
            error: "erroidreceitaremedioinvalida"
        })
    }
    next();
}

exports.deleteReceitaRemedio = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_Receita_Remedio)){
        return res.status(500).send({
            error: "erroidreceitaremediovazio"
        })
    }

    if(req.body.id_Receita_Remedio.length !== 60){
        return res.status(500).send({
            error: "erroidreceitaremedioinvalida"
        })
    }
    next();
}