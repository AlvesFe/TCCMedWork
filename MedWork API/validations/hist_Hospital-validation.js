/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Hospital do projeto MEDWORK,
    Toda manipulação de dados da Hst_Hospital feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÕES GLOBAIS
function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

exports.getHistoricoHospitais = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Hospital',
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Hospital WHERE id_historico_Hospital = ?',
            [req.body.id_historico_Hospital],
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