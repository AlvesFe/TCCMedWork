/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Receita do projeto MEDWORK,
    Toda manipulação de dados da Hst_Receita feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/



//FUNÇÕES GLOBAIS
function isNullOrWhitespace(field) {
    return !field;
}

exports.getReceita = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_Historico_Receita)){
        return res.status(500).send({ 
            error: "erroidhistoricoreceitavazio" 
        })
    }

    if(req.body.id_Historico_Receita.length !== 32){
        return res.status(500).send({ 
            error: "erroidhistoricoreceitainvalido" 
        })
    }
    next();
}