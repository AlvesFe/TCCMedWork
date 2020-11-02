/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Farmacia do projeto MEDWORK,
    Toda manipulação de dados da Hst_Farmacia feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/



//FUNÇÕES GLOBAIS

function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

exports.getHistoricoFarmacia = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_historico_Farmacia)){
        return res.status(500).send({ 
            error: "erroidhistoricofarmaciavazio" 
        })
    }

    if(req.body.id_historico_Farmacia.length !== 32){
        return res.status(500).send({ 
            error: "erroidhistoricofarmaciainvalido" 
        })
    }
    next();
} 