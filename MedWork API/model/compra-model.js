//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

exports.postCompra = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        const id_Compra = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, valorRecebido, valorDevolvido, fk_id_Paciente, fk_id_Remedio)VALUES(?, ?,?,?,?)',
            [id_Compra, req.body.cod_fiscal, req.body.quantidade, req.body.valorRecebido, req.body.valorDevolvido, req.body.fk_id_Paciente, req.body.fk_id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Compra Cadastrada',
                    id_Compra: id_Compra
                })
            }
        )
    })
}

exports.getCompras = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Compra',
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

exports.getCompra = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Compra WHERE id_Compra = ?',
            [req.body.id_Compra],
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

exports.patchCompra = (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Compra
            SET
            quantidade = ?
            valorRecebido = ?, 
            valorDevolvido = ?
            WHERE id_Compra = ?`,
            [req.body.quantidade, req.body.valorRecebido, req.body.valorDevolvido, req.body.id_Compra],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Compra Atualizada',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteCompra = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Compra WHERE id_Compra = ?`,
            [req.body.id_Compra],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Compra excluída com sucesso'
                })
            }
        )
    })

}