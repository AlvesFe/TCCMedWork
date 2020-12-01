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

exports.listReceita = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT id_Receita, dt_Emissao, nome, Quantidade FROM tbl_Receita 
            INNER JOIN tbl_Receita_Remedio ON fk_id_Receita = id_Receita
            INNER JOIN tbl_Remedio ON id_Remedio = fk_id_Remedio WHERE fk_id_Paciente = ?`,
            [req.body.id_Paciente],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }
                res.status(200).send({
                    success: 1,
                    data: resultado
                })
            }
        )
    })
}

exports.detalhesReceita = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        conn.query(`
        SELECT rm.id_Remedio, rm.bula, rc.dt_Emissao, rc.dt_Validade, rc.dosagem, rc.orientacoes, pc.nome AS Paciente, pc.cpf, pc.rg, rr.Quantidade , md.nome AS Medico, md.especialidade, md.crm, rm.nome AS Remedio
        FROM tbl_Receita AS rc
        INNER JOIN tbl_Paciente AS pc ON rc.fk_id_Paciente = id_Paciente
        INNER JOIN tbl_Medico AS md ON rc.fk_id_Medico = id_Medico
        INNER JOIN tbl_Receita_Remedio AS rr ON rr.fk_id_Receita = id_Receita
        INNER JOIN tbl_Remedio AS rm ON id_Remedio = rr.fk_id_Remedio
        WHERE id_Receita = ?`, [req.body.id_Receita],
        (error, resultado, field) => {
            conn.release()
            if (error) { return res.status(500).send({ error: error }) }

            res.status(200).send({
                success: 1,
                data: resultado
            })
        })
    })
}