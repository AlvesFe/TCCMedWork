/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hospital do projeto MEDWORK,
    Toda manipulação de dados do hospital feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importando AXIOS
const axios = require('axios');

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

exports.postHospital = (req, res, next) => {

    //Função que verifica se determinado valor está em branco ou só com espaços
    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
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

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.cnpj.length < 8) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if (ValidationNumber(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    function validateCNPJ(value) {

        axios({
            method: 'get',
            url: `http://geradorapp.com/api/v1/cnpj/validate/${value}?token=1a77a5b656040aace894962324363778`
        })
            .then(function (response) {
                console.log(response.data.status);
            });
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM tbl_Hospital WHERE email = ? OR cnpj = ?', [req.body.email, req.body.cnpj],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (!resultado[0]) {
                    mysql.getConnection((error, conn) => {

                        if (error) { return res.status(500).send({ error: error }) }

                        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                            const id_Hospital = bcrypt.hashSync(Date.now().toString(), 10);
                            conn.query(
                                'INSERT INTO tbl_Hospital (id_Hospital, cnpj, nome, endereco, telefone, email, senha, fk_id_MedWork)VALUES(?,?,?,?,?,?,?,?)',
                                [id_Hospital, req.body.cnpj, req.body.nome, req.body.endereco, req.body.telefone, req.body.email, hash, req.body.fk_id_MedWork],
                                (error, resultado, field) => {
                                    conn.release()

                                    if (error) { return res.status(500).send({ error: error }) }

                                    res.status(201).send({
                                        mensagem: 'Hospital Cadastrado',
                                        id_Hospital: id_Hospital
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

exports.getHospitais = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Hospital',
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

exports.getHospital = (req, res, next) => {

    if (isNullOrWhitespace(req.params.id_Hospital)) {
        return res.status(500).send({
            error: "erroidhospitalvazio"
        })
    }

    if (req.params.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidhospital"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Hospital WHERE id_Hospital = ?',
            [req.params.id_Hospital],
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

exports.patchHospital = (req, res, next) => {

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
            error: "errortamanhotelefone"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                `UPDATE tbl_Hospital
                    SET
                       nome = ?,
                       endereco = ?,
                       telefone = ?,
                       ativo = ?,
                       foto = ?,
                       senha = ?
                    WHERE id_Hospital = ?`,
                [req.body.nome, req.body.endereco, req.body.telefone, req.body.ativo, req.body.foto, hash, req.body.id_Hospital],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Hospital Atualizado',
                        response: resultado.insertId
                    })
                }
            )
        })
    })
}

exports.deleteHospital = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Hospital)) {
        return res.status(500).send({
            error: "erroridhospitalvazio"
        })
    }

    if (req.body.id_Hospital.length !== 60) {
        return res.status(500).send({
            error: "erroridhospitalinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `DELETE FROM tbl_Hospital WHERE id_Hospital = ?`,
            [req.body.id_Hospital],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Hospital excluído com sucesso'
                })
            }
        )
    })
}

exports.logarHospital = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_Hospital WHERE email = ?`;

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
                        id_Hospital: results[0].id_Hospital,
                        email: results[0].email,
                        nome: results[0].nome
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "5h"
                        })
                    return res.status(200).send({ mensagem: 'Hospital Autenticado com sucesso', token: token })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })

}