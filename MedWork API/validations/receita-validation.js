/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Receita do projeto MEDWORK,
    Toda manipulação de dados da Receita feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//FUNÇÕES GLOBAIS

//Função que verifica se determinado valor está em branco ou só com espaços
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

exports.postReceita = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

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

    if (isNullOrWhitespace(req.params.id_Receita)) {
        return res.status(500).send({
            error: "erroidreceitavazio"
        })
    }

    if (req.params.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita WHERE id_Receita = ?',
            [req.params.id_Receita],
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

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }

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

exports.deleteREceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidreceitavazio"
        })
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }

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