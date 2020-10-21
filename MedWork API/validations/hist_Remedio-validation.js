/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Remedio do projeto MEDWORK,
    Toda manipulação de dados da Hst_Remedio feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÕES GLOBAIS
function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

exports.getRemedios = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Remedio',
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

exports.getRemedio = (req, res, next) => {

    if(isNullOrWhitespace(req.params.id_Historico_Remedio)){
        return res.status(500).send({ 
            error: "erroidhistoricoremediovazio" 
        })
    }

    if(req.params.id_Historico_Remedio.length !== 60){
        return res.status(500).send({ 
            error: "erroidhistoricoremedioinvalido" 
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Remedio WHERE id_Historico_Remedio = ?',
            [req.params.id_Historico_Remedio],
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