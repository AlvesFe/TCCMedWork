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

function validateURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
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

    if(!validateURL(req.body.bula)){
        return res.status(500).send({
            error: "errourlinvalida"
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