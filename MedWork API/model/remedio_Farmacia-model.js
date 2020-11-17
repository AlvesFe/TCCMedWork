//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postRemedioFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        const id_Remedio_Farmacia = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Remedio_Farmacia (id_Remedio_Farmacia, estoque, fk_id_Farmacia, fk_id_Remedio)VALUES(?,?,?,?)',
            [id_Remedio_Farmacia, req.body.estoque, req.body.fk_id_Farmacia, req.body.fk_id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Remedio_Farmacia Cadastrada',
                    id_Remedio_Farmacia: id_Remedio_Farmacia
                })
            }
        )
    })
}

exports.getRemediosFarmacias = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Remedio_Farmacia',
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

exports.getRemediosFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Remedio_Farmacia WHERE id_Remedio_Farmacia = ?',
            [req.body.id_Remedio_Farmacia],
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

exports.patchRemedioFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Remedio_Farmacia
            SET
            estoque = ?
            WHERE id_Remedio_Farmacia = ?`,
            [req.body.estoque, req.body.id_Remedio_Farmacia],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Remedio_Farmacia Atualizado',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteRemedioFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Remedio_Farmacia WHERE id_Remedio_Farmacia = ?`,
            [req.body.id_Remedio_Farmacia],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Remedio_Farmacia excluído com sucesso'
                })
            }
        )
    })
}

exports.getFarmaciaRemedios = (req, res, next) => {

    mysql.getConnection((error, conn) =>{

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`SELECT rm.id_Remedio, fm.nome as Farmcia, fm.foto, rm.nome, rm.preco
        FROM tbl_Farmacia fm
        INNER JOIN tbl_Remedio_Farmacia AS rf ON fk_id_Farmacia = id_Farmacia
        INNER JOIN tbl_Remedio rm ON fk_id_remedio = id_remedio
        WHERE id_remedio = ? AND rf.estoque > 0`, [req.body.id_Remedio], 
        (error, resultado, field) => {
            if (error) { return res.status(500).send({ error: error }) }


            res.status(202).send({
                success: 1,
                data: resultado
            })
        })

    })

}
