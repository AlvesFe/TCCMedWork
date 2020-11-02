/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Historico_Consulta do projeto MEDWORK,
    Toda manipulação de dados da farmacia feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÃO BLOBAIS

function isNullOrWhitespace(field) {
    return !field;
}



exports.getHistoricoConsulta = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_Historico_Consulta)){
        return res.status(500).send({ 
            error: "erroidhistoricoconsultavazio" 
        })
    }

    if(req.body.id_Historico_Consulta.length !== 32){
        return res.status(500).send({ 
            error: "erroidhistoricoconsultainvalido" 
        })
    }
    next();
}