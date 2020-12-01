//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        const id_Remedio = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Remedio (id_Remedio, codigo, dt_Validade, tarja, nome, descricao, fabricante, preco)VALUES(?,?,?,?,?,?,?,?)',
            [id_Remedio, req.body.codigo, req.body.dt_Validade, req.body.tarja, req.body.nome, req.body.descricao, req.body.fabricante, req.body.preco],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Remedio Cadastrado',
                    id_Remedio: id_Remedio
                })
            }
        )
    })
}

exports.getRemedios = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Remedio',
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Remedio WHERE codigo = ?',
            [req.body.codigo],
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

exports.patchRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Remedio
                SET
                dt_Validade = ?,
                tarja = ?,
                nome = ?,
                descricao = ?,
                fabricante = ?,
                preco = ?
                WHERE id_Remedio = ?`,
            [req.body.dt_Validade, req.body.tarja, req.body.nome, req.body.descricao, req.body.fabricante, req.body.preco, req.body.id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Remedio Atualizado',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Remedio WHERE id_Remedio = ?`,
            [req.body.id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Remedio excluído com sucesso'
                })
            }
        )
    })

}