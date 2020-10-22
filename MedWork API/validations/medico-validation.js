/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Medico do projeto MEDWORK,
    Toda manipulação de dados da Medico feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//FUNÇÕES GLOBAIS
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

function isNullOrWhitespace(field) {
    return !field
}


exports.postMedico = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.crm.legth < 6) {
        return res.status(500).send({
            error: "errotamanhocrm"
        })
    }

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (req.body.celular.length < 11) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.cpf.length !== 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (req.body.rg.length !== 9) {
        return res.status(500).send({
            error: "errotamanhorg"
        })
    }

    if (ValidationNumber(req.body.rg)) {
        return res.status(500).send({
            error: "errorginvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query('SELECT * FROM tbl_Medico WHERE crm = ? OR email = ? OR cpf = ? OR rg = ?', [req.body.crm, req.body.email, req.body.cpf, req.body.rg],
                (error, resultado, field) => {
                    conn.release()
                    if (error) { return res.status(500).send({ error: error }) }
                    if (!resultado[0]) {
                        mysql.getConnection((error, conn) => {

                            if (error) { return res.status(500).send({ error: error }) }

                            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                                const id_Medico = bcrypt.hashSync(Date.now().toString(), 10);
                                conn.query(
                                    'INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)VALUES(?, ?,?,?,?,?,?,?,?,?,?,?,?)',
                                    [id_Medico, req.body.crm, req.body.email, req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, hash, req.body.tp_sanguineo, req.body.cpf, req.body.rg, req.body.fk_id_Hospital],
                                    (error, resultado, field) => {
                                        conn.release()

                                        if (error) { return res.status(500).send({ error: error }) }

                                        res.status(201).send({
                                            mensagem: 'Medico Cadastrado',
                                            id_Medico: id_Medico
                                        })
                                    }
                                )
                            })
                        })
                    }
                    else {
                        return res.status(500).send({ error: "errodadosjainseridos" })
                    }
                })
        })
    })
}

exports.getMedicos = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Medico',
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

exports.getMedico = (req, res, next) => {

    if (isNullOrWhitespace(req.params.id_Medico)) {
        return res.status(500).send({
            error: "erroidmedicovazio"
        })
    }

    if (req.params.id_Medico.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidmedico"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Medico WHERE id_Medico = ?',
            [req.params.id_Medico],
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

exports.patchMedico = (req, res, next) => {

    //Laço que verifica se todos os campos possuem valor
    for (let key in req.body) {
        if (!req.body[key]) {
            if (key == "ativo") {
                if (!req.body[key] === 0 || !req.body[key] === 1) {
                    return res.status(500).send({
                        error: "erro" + key + "vazio",
                        errormes: req.body[key]
                    })
                }
            }
            else {
                return res.status(500).send({
                    error: "erro" + key + "vazio",
                    errormes: key
                })
            }
        }
    }

    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (req.body.celular.length < 11) {
        return res.status(500).send({
            error: "errotamanhoceleular"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "erroceleularnvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                `UPDATE tbl_Medico
                    SET
                    nome = ?,
                    especialidade = ?,
                    telefone = ?,
                    celular = ?,
                    dt_Nascimento = ?,
                    ativo = ?,
                    foto = ?,
                    senha = ?,
                    tp_sanguineo = ?
                    WHERE id_Medico = ?`,
                [req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, req.body.ativo, req.body.foto, hash, req.body.tp_sanguineo, req.body.id_Medico],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Medico Atualizado',
                        response: resultado.insertId
                    })
                }
            )
        })
    })
}

exports.deleteMedico = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Medico)) {
        return res.status(500).send({
            error: "erroidmedicovazio"
        })
    }

    if (req.body.id_Medico.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidmedico"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Medico WHERE id_Medico = ?`,
            [req.body.id_Medico],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Medico excluído com sucesso'
                })
            }
        )
    })
}

exports.logarMedico = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_Medico WHERE crm = ?`;

        conn.query(query, [req.body.crm], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }

            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) { return res.status(401).send({ mensagem: 'Falha na autenticação' }) }
                if (result) {
                    const token = jwt.sign({
                        id_Hospital: results[0].id_Medico,
                        crm: results[0].crm,
                        nome: results[0].nome
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "5h"
                        })
                    return res.status(200).send({ mensagem: 'Medico Autenticado com sucesso', token: token })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })
}