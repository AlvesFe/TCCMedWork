//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postReceita = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        const id_Receita = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Receita (id_Receita, dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)VALUES(?,?,?,?,?,?,?)',
            [id_Receita, req.body.dosagem, req.body.dt_Emissao, req.body.orientacoes, req.body.dt_Validade, req.body.fk_id_Medico, req.body.fk_id_Paciente],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Receita Cadastrada',
                    id_Receita: id_Receita
                })
            }
        )
    })
}

exports.getReceitas = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita',
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita WHERE id_Receita = ?',
            [req.body.id_Receita],
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

exports.patchReceita = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Receita
            SET
                dosagem = ?,
                dt_Emissao = ?,
                orientacoes = ?,
                dt_Validade = ?
            WHERE id_Receita = ?`,
            [req.body.dosagem, req.body.dt_Emissao, req.body.orientacoes, req.body.dt_Validade, req.body.id_Receita],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Receita Atualizada',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteReceita = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Receita WHERE id_Receita = ?`,
            [req.body.id_Receita],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Receita excluída com sucesso'
                })
            }
        )
    })
}