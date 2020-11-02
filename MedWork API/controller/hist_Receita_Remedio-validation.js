/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Receita_Remedio do projeto MEDWORK,
    Toda manipulação de dados da Hst_Receita_Remedio feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//FUNÇÕES GLOBAIS
function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

exports.getHistoricoReceitaRemedio = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_Historico_Receita_Remedio)){
        return res.status(500).send({ 
            error: "erroidhistoricohospitalavazio" 
        })
    }

    if(req.body.id_Historico_Receita_Remedio.length !== 32){
        return res.status(500).send({ 
            error: "erroidhistoricoreceitaremedioinvalido" 
        })
    }
    next();
}