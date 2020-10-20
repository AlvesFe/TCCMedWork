//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postConsulta = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        for (let key in req.body) {
            if (!req.body[key]) {
                return res.status(500).send({
                    error: "erro" + key + "vazio"
                })
            }
        }

        if (error) { return res.status(500).send({ error: error }) }
        const id_Consulta = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Consulta (id_Consulta, dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita) VALUES (?, ?,?,?,?,?)',
            [id_Consulta, req.body.dt_Consulta, req.body.descricao, req.body.fk_id_Paciente, req.body.fk_id_Medico, req.body.fk_id_Receita],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Consulta Cadastrada',
                    id_Farmacia: id_Consulta
                })
            }
        )
    })
}

exports.getConsultas = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Consulta',
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

exports.getConsulta = (req, res, next) => {

    if(!req.params.id_Consulta){
        return res.status(500).send({
            error: "erroidconsultavazio"
        })
    }

    if(req.params.id_Consulta.length != 60){
        return res.status(500).send({
            error: "errotamanhoidconsulta"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Consulta WHERE id_Consulta = ?',
            [req.params.id_Consulta],
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

exports.patchConsulta = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if(req.body.id_Consulta.length != 60){
        return res.status(500).send({
            error: "errotamanhoidconsulta"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Consulta
            SET
            dt_Consulta = ?,
            descricao = ?
            WHERE id_Consulta = ?`,
            [req.body.dt_Consulta, req.body.descricao, req.body.id_Consulta],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Consulta Atualizada',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteConsulta = (req, res, next) => {

    if(!req.body.id_Consulta){
        return res.status(500).send({
            error: "erroidconsultavazio"
        })
    }

    if(req.body.id_Consulta.length != 60){
        return res.status(500).send({
            error: "errotamanhoidconsulta"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Consulta WHERE id_Consulta = ?`,
            [req.body.id_Consulta],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Consulta excluída com sucesso'
                })
            }
        )
    })

}