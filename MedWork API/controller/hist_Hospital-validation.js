/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Hospital do projeto MEDWORK,
    Toda manipulação de dados da Hst_Hospital feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/



//FUNÇÕES GLOBAIS
function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

exports.getHistoricoHospital = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_historico_Hospital)){
        return res.status(500).send({ 
            error: "erroidhistoricohospitalavazio" 
        })
    }

    if(req.body.id_historico_Hospital.length !== 32){
        return res.status(500).send({ 
            error: "erroididhistoricohospitalinvalido" 
        })
    }
    next();
}