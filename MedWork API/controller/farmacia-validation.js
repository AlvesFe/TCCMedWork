//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importando AXIOS
const axios = require('axios');

//FUNÇÕES GLOBAIS
// Verifica se é um Número
function ValidationNumber(value) {

    if(isNaN(value)){
        return true;
    }
    return false;
}

function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

//Função que verifica se o email inserido é valido
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

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

exports.postFarmacia = async (req, res, next) => {

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

    //Verifica o tamanho do campo telefone
    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.cnpj.length != 8) {
        return res.status(500).send({
            error: "errotamanhocnpj"
        })
    }

    if(ValidationNumber(req.body.telefone)){
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }
    if(ValidationNumber(req.body.cnpj)){
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
        conn.query('SELECT * FROM tbl_Farmacia WHERE email = ? OR cnpj = ?', [req.body.email, req.body.cnpj],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (!resultado[0]) {
                    mysql.getConnection((error, conn) => {

                        if (error) { return res.status(500).send({ error: error }) }

                        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                            const id_Farmacia = bcrypt.hashSync(Date.now().toString(), 10);

                            conn.query(
                                'INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, cnpj, senha, email, fk_id_MedWork)VALUES(?,?,?,?,?,?,?,?,?)',
                                [id_Farmacia, req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, req.body.cnpj, hash, req.body.email, req.body.fk_id_MedWork],
                                (error, resultado, field) => {
                                    conn.release()

                                    if (error) { return res.status(500).send({ error: error }) }

                                    res.status(201).send({
                                        mensagem: 'Farmacia Cadastrado',
                                        id_Farmacia: id_Farmacia
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


exports.getFarmacias = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Farmacia',
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

exports.getFarmacia = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Farmacia)) {
        return res.status(500).send({
            error: "erroidfarmaciavazio"
        })
    }

    if (req.body.id_Farmacia.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidfarmacia"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Farmacia WHERE id_Farmacia = ?',
            [req.body.id_Farmacia],
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

exports.patchFarmacia = (req, res, next) => {

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

    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (req.body.id_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidFarmacia"
        })
    }

    if(ValidationNumber(req.body.telefone)){
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                `UPDATE tbl_Farmacia
                    SET
                    nome = ?, 
                    telefone = ?, 
                    endereco = ?, 
                    detalhes = ?, 
                    ativo = ?, 
                    senha = ?, 
                    foto = ?
                    WHERE id_Farmacia = ?`,
                [req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, req.body.ativo, hash, req.body.foto, req.body.id_Farmacia],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Farmacia Atualizada',
                        response: resultado.insertId
                    })
                }
            )

        })
    })
}

exports.deleteFarmacia = (req, res, next) => {

    function isNullOrWhitespace(field) {
        return !field || !field.trim();
    }

    if (isNullOrWhitespace(req.body.id_Farmacia)) {
        return res.status(500).send({
            error: "erroidfarmaciavazio"
        })
    }

    if (req.body.id_Farmacia.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidFarmacia"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Farmacia WHERE id_Farmacia = ?`,
            [req.body.id_Farmacia],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Farmacia excluída com sucesso'
                })
            }
        )
    })
}

exports.logarFarmacia = (req, res, next) => {

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
        const query = `SELECT * FROM tbl_farmacia WHERE email = ?`;

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
                        id_Farmacia: results[0].id_Farmacia,
                        email: results[0].email,
                        nome: results[0].nome
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "5h"
                        })
                    return res.status(200).send({ mensagem: 'Farmacia Autenticada com sucesso', token: token })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })

}