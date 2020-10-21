/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Farmacia do projeto MEDWORK,
    Toda manipulação de dados da Hst_Farmacia feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÕES GLOBAIS

function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

exports.getHistoricoFarmacias = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Farmacia',
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

exports.getHistoricoFarmacia = (req, res, next) => {

    if(isNullOrWhitespace(req.params.id_historico_Farmacia)){
        return res.status(500).send({ 
            error: "erroidhistoricofarmaciavazio" 
        })
    }

    if(req.params.id_historico_Farmacia.length !== 60){
        return res.status(500).send({ 
            error: "erroidhistoricofarmaciainvalido" 
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Farmacia WHERE id_historico_Farmacia = ?',
            [req.params.id_historico_Farmacia],
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