/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Recepcionista do projeto MEDWORK,
    Toda manipulação de dados do Recepcionista feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importando AXIOS
const axios = require('axios');

//FRUNÇÕE GLOBAIS

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

//Função que verifica se o email inserido é valido
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

function validateCPF(value) {

    axios({
        method: 'get',
        url: `http://geradorapp.com/api/v1/cpf/validate/${value}?token=1a77a5b656040aace894962324363778`
    })
        .then(function (response) {
            return response.data.status;
        });
}

exports.postRecepcionista = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.cpf.length < 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.rg.length < 9) {
        return res.status(500).send({
            error: "errotamanhorg"
        })
    }

    if (ValidationNumber(req.body.rg)) {
        return res.status(500).send({
            error: "errorginvalido"
        })
    }

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
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
    

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM Tbl_Recepcionista WHERE cpf = ? OR rg = ? OR email = ?', [req.body.cpf, req.body.rg, req.body.email],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (!resultado[0]) {
                    mysql.getConnection((error, conn) => {

                        //Criptografa a senha inserida pelo usuario no momento de cadastro
                        if (error) { return res.status(500).send({ error: error }) }

                        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                            const id_Recepcionista = bcrypt.hashSync(Date.now().toString(), 10);
                            conn.query(
                                'INSERT INTO tbl_Recepcionista (id_Recepcionista, nome, dt_Nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
                                [id_Recepcionista, req.body.nome, req.body.dt_Nascimento, req.body.tp_sanguineo, req.body.endereco, req.body.cpf, hash, req.body.rg, req.body.email, req.body.celular, req.body.telefone, req.body.fk_id_Hospital],
                                (error, resultado, field) => {
                                    conn.release()

                                    if (error) { return res.status(500).send({ error: error }) }

                                    res.status(201).send({
                                        mensagem: 'Recepcionista Cadastrado',
                                        id_Recepcionista: id_Recepcionista
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
}

exports.getRecepcionistas = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Recepcionista',
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

exports.getRecepcionista = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Recepcionista)) {
        return res.status(500).send({
            error: "erroidrecepcionistavazio"
        })
    }

    if (req.body.id_Recepcionista.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidrecepcionista"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Recepcionista WHERE id_Recepcionista = ?',
            [req.body.id_Recepcionista],
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

exports.patchRecepcionista = (req, res, next) => {

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

    if (req.body.telefone.length < 11) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.id_Recepcionista.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidrecepcionista"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                `UPDATE tbl_Recepcionista
                    SET
                       nome = ?,
                       dt_nascimento = ?,
                       tp_sanguineo = ?,
                       ativo = ?,
                       endereco = ?,
                       senha =?,
                       celular = ?,
                       telefone = ?
                    WHERE id_Recepcionista = ?`,
                [req.body.nome, req.body.dt_nascimento, req.body.tp_sanguineo, req.body.ativo, req.body.endereco, hash, req.body.celular, req.body.telefone, req.body.id_Recepcionista],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Recepcionista Atualizado',
                        response: resultado.insertId
                    })
                }
            )

        })
    })
}

exports.deleteRecepcionista = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Recepcionista)) {
        return res.status(500).send({
            error: "erroidrecepcionistavazio"
        })
    }

    if (req.body.id_Recepcionista.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidrecepcionista"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Recepcionista WHERE id_Recepcionista = ?`,
            [req.body.id_Recepcionista],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Recepcionista excluído com sucesso'
                })
            }
        )
    })
}

exports.LogarRecepcionista = (req, res, next) => {

    //Laço que verifica se todos os campos possuem valor
    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    //Verifica se o email é valido
    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_Recepcionista WHERE email = ?`;

        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }

            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) { return res.status(401).send({ mensagem: 'Falha na autenticação' }) }
                if (result) {
                    const token = jwt.sign({
                        id_Recepcionista: results[0].id_Recepcionista,
                        email: results[0].email,
                        nome: results[0].nome
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "5h"
                        })
                    return res.status(200).send({ mensagem: 'Recepcionista Autenticada com sucesso', token: token })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })

}