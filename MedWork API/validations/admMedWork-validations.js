//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importando AXIOS
const axios = require('axios');

//FUNÇÕES GLOBAIS

//Função que verifica se o email inserido é valido
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

//VALIDA CNPJ ATRAVÉS DE UMA API
async function validateCNPJ(value) {
    const resposta = await axios({
        method: 'get',
        url: `http://geradorapp.com/api/v1/cnpj/validate/${value}?token=1a77a5b656040aace894962324363778`
    })
    .then((response) => {
        return response.data.status;
    });

    return resposta == 1 ?  true : false
}

//Faz a validação e inserção no banco de dados de um novo cadastro da MedWork
exports.postAdmMedwork = async (req, res, next) => {

    //Função que verifica se determinado valor está em branco ou só com espaços
    for (let key in req.body) {
        if (!req.body[key]) {
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

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    //Verifica o Tamanho do campo CNPJ 
    if (req.body.cnpj.length != 8) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if (ValidationNumber(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    if(!await validateCNPJ(req.body.cnpj)){
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }



    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM tbl_MedWork WHERE email = ? OR cnpj = ?', [req.body.email, req.body.cnpj],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (!resultado[0]) {
                    mysql.getConnection((error, conn) => {

                        if (error) { return res.status(500).send({ error: error }) }

                        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                            const id_MedWork = bcrypt.hashSync(Date.now().toString(), 10);

                            conn.query(
                                'INSERT INTO tbl_MedWork (id_MedWork, nome, email, senha, cnpj)VALUES(?,?,?,?,?)',
                                [id_MedWork, req.body.nome, req.body.email, hash, req.body.cnpj],
                                (error, resultado, field) => {
                                    conn.release()

                                    if (error) { return res.status(500).send({ error: error }) }

                                    res.status(201).send({
                                        mensagem: 'Usuário Cadastrado',
                                        id_Medwork: id_MedWork
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

exports.getAdmsMedWork = async (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_MedWork',
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

exports.getAdmMedWork = (req, res, next) => {

    if (req.body.cnpj_admMedWork.length != 8) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if (ValidationNumber(req.body.cnpj_admMedWork)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_MedWork WHERE cnpj = ?',
            [req.body.cnpj_admMedWork],
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

exports.patchAdmMedWork = (req, res, next) => {

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

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.cnpj.length != 8) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if (ValidationNumber(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
            conn.query(
                `UPDATE tbl_MedWork
                    SET
                        nome = ?,
                        senha = ?,
                        ativo = ?,
                        foto = ?
                    WHERE cnpj = ?`
                ,
                [req.body.nome, hash, req.body.ativo, req.body.foto, req.body.cnpj],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'AdmMedWork Atualizado'
                    })
                }
            )
        })
    })
}

exports.deleteAdmMedWork = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cnpj)) {
        return res.status(500).send({
            error: "errocnpjvazio"
        })
    }

    //Verifica o tamanho do campo CNPJ
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_MedWork WHERE cnpj = ?`,
            [req.body.cnpj],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'AdmMedWork excluído com sucesso'
                })
            }
        )
    })
}

exports.logarAdmMedwork = (req, res, next) => {

    function validateEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return (false)
        }
        return (true)
    }

    function isNullOrWhitespace(field) {
        return !field || !field.trim();
    }

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_MedWork WHERE email = ?`;

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
                        id_Paciente: results[0].id_MedWork,
                        email: results[0].email,
                        nome: results[0].nome
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "5h"
                        })
                    return res.status(200).send({ mensagem: 'Autenticado com sucesso', token: token })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })

}