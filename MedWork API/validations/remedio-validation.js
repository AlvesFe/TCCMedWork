/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Remedio do projeto MEDWORK,
    Toda manipulação de dados da Remedio feitas pelo APP ou Site do projeto 
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

exports.postRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.preco)) {
        return res.status(500).send({
            error: "erroprecoinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        const id_Remedio = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Remedio (id_Remedio, dt_Validade, tarja, nome, descricao, fabricante, preco)VALUES(?,?,?,?,?,?,?)',
            [id_Remedio, req.body.dt_Validade, req.body.tarja, req.body.nome, req.body.descricao, req.body.fabricante, req.body.preco],
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

    if (isNullOrWhitespace(req.params.id_Remedio)) {
        return res.status(500).send({
            error: "erroidremediovazio"
        })
    }

    if (req.params.id_Remedio.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremedio"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Remedio WHERE id_Remedio = ?',
            [req.params.id_Remedio],
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

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (ValidationNumber(req.body.preco)) {
        return res.status(500).send({
            error: "erroprecoinvalido"
        })
    }

    if (req.body.id_Remedio.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremedio"
        })
    }

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

    if (isNullOrWhitespace(req.body.id_Remedio)) {
        return res.status(500).send({
            error: "erroidremediovazio"
        })
    }

    if (req.body.id_Remedio.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidremedio"
        })
    }

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