//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;


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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Hst_Farmacia WHERE id_historico_Farmacia = ?',
            [req.body.id_historico_Farmacia],
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