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
    return !field || !field.trim();
}

exports.GetHistoricoConsultas = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Consulta',
            (error, resultado, fields) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    data: resultado
                })
            }
        )
    })
}

exports.GetHistoricoConsulta = (req, res, next) => {

    if(isNullOrWhitespace(req.params.id_Historico_Consulta)){
        return res.status(500).send({ 
            error: "erroidhistoricoconsultavazio" 
        })
    }

    if(req.params.id_Historico_Consulta.length !== 60){
        return res.status(500).send({ 
            error: "erroidhistoricoconsultainvalido" 
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Consulta WHERE id_Historico_Consulta = ?',
            [req.params.id_Historico_Consulta],
            (error, resultado, fields) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    data: resultado
                })
            }
        )
    })

}