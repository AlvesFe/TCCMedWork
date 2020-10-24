/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Receita do projeto MEDWORK,
    Toda manipulação de dados da Hst_Receita feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÕES GLOBAIS
function isNullOrWhitespace(field) {
    return !field;
}

exports.getReceitas = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Receita',
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Receita WHERE id_Historico_Receita = ?',
            [req.body.id_Historico_Receita],
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