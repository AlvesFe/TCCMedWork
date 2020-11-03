//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postReceitaRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        const id_Receita_Remedio = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)VALUES(?, ?,?,?)',
            [id_Receita_Remedio, req.body.Quantidade, req.body.fk_id_Receita, req.body.fk_id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Receita_Remedio Cadastrada',
                    id_Receita_Remedio: id_Receita_Remedio
                })
            }
        )
    })
}

exports.getReceitasRemedios = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita_Remedio',
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

exports.getReceitasRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita_Remedio WHERE id_Receita_Remedio = ?',
            [req.body.id_Receita_Remedio],
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

exports.patchReceitaRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Receita_Remedio
            SET
            Quantidade = ?
            WHERE id_Receita_Remedio = ?`,
            [req.body.Quantidade, req.body.id_Receita_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Receita_Remedio Atualizada',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteReceitaRemedio = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Receita_Remedio WHERE id_Receita_Remedio = ?`,
            [req.body.id_Receita_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Receita_Remedio excluída com sucesso'
                })
            }
        )
    })
}