/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Remedio_Farmacia do projeto MEDWORK,
    Toda manipulação de dados da Remedio_Farmacia feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//FUNÇÕES GLOBAIS

function isNullOrWhitespace(field) {
    return !field
}

// Verifica se é um Número
function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

exports.postRemedioFarmacia = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.estoque)) {
        return res.status(500).send({
            error: "erroestoqueinvalido"
        })
    }

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

exports.getRemedioFarmacia = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Remedio_Farmacia)) {
        return res.status(500).send({
            error: "erroidremediofarmaciavazio"
        })
    }

    if (req.body.id_Remedio_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremediofarmacia"
        })
    }

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

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.estoque)) {
        return res.status(500).send({
            error: "erroestoqueinvalido"
        })
    }

    if (req.body.id_Remedio_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremediofarmacia"
        })
    }

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

exports.deleteREmedioFarmacia = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Remedio_Farmacia)) {
        return res.status(500).send({
            error: "erroidremediofarmaciavazio"
        })
    }

    if (req.body.id_Remedio_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremediofarmacia"
        })
    }

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