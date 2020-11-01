//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importando AXIOS
const axios = require('axios');

//FUNÇÕES GLOBAIS
//Função que verifica se determinado valor está em branco ou só com espaços
function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

// Verifica se é um Número
function ValidationNumber(value) {
    return isNaN(value);
}

//Função que verifica se o email inserido é valido
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (false)
    }
    return (true)
}

async function validateCPF(value) {

    const resposta = await axios({
        method: 'get',
        url: `http://geradorapp.com/api/v1/cpf/validate/${value}?token=${process.env.CPF_TOKEN}`
    })
    .then((response) => {
        return response.data.status;
    });
    
    return resposta == 1 ?  true : false
}

//Faz a validação e inserção no banco de dados de um novo cadastro de pacientes
exports.postPaciente = async (req, res, next) => {

    //Laço que verifica se todos os campos possuem valor
    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    //Verifica o tamanho do campo telefone
    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    //Verifica o tamanho do campo rg
    if (req.body.rg.length < 9) {
        return res.status(500).send({
            error: "errotamanhorg"
        })
    }

    //Verifica se o email é valido
    if (validateEmail(req.body.email)) {
        return res.status(500).send({
            error: "erroemailinvalido"
        })
    }

    //Verifica o tamanho do campo CPF
    if (req.body.cpf.length < 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    //Verifica o tamanho do campo celular
    if (req.body.celular.length < 13 && req.body.celular.length > 15) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (ValidationNumber(req.body.telefone)) {
        return res.status(500).send({
            error: "errotelefoneinvalido"
        })
    }

    if (ValidationNumber(req.body.rg)) {
        return res.status(500).send({
            error: "errorginvalido"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (!await validateCPF(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }
    

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM tbl_Paciente WHERE email = ? OR cpf = ? OR rg = ?', [req.body.email, req.body.cpf, req.body.rg],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (!resultado[0]) {
                    mysql.getConnection((error, conn) => {

                        if (error) { return res.status(500).send({ error: error }) }

                        //Criptografa a senha inserida pelo usuario no momento de cadastro
                        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                            const id_Paciente = bcrypt.hashSync(Date.now().toString(), 10);

                            conn.query(
                                'INSERT INTO tbl_Paciente (id_Paciente ,dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                [id_Paciente, req.body.dt_Nascimento, req.body.nome, req.body.telefone, req.body.tp_sanguineo, req.body.alergia, req.body.rg, req.body.email, req.body.cpf, req.body.endereco, req.body.celular, hash, req.body.fk_id_Recepcionista],
                                (error, resultado, fields) => {
                                    conn.release()

                                    if (error) { return res.status(500).send({ error: error }) }

                                    res.status(201).send({
                                        mensagem: 'Paciente Cadastrado',
                                        id_Paciente: id_Paciente
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

//Faz verificação no banco de dados de todos os pacientes cadastrados
exports.getPacientes = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Paciente',
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

//Faz verificação no banco de dados de um paciente cadastrado, usando seu CPF
exports.getPaciente = (req, res, next) => {

    //Verifica o tamanho do campo CPF
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Paciente WHERE cpf = ?',
            [req.body.cpf],
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

//Atualiza os dados de um determinado paciente
exports.patchPaciente = (req, res, next) => {

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

    //Verifica o tamanho do campo telefone
    if (req.body.telefone.length < 10) {
        return res.status(500).send({
            error: "errotamanhotelefone"
        })
    }

    //Verifica o tamanho do campo CPF
    if (req.body.cpf.length < 11) {
        return res.status(500).send({
            error: "errotamanhocpf"
        })
    }

    //Verifica o tamanho do campo celular
    if (req.body.celular.length < 10) {
        return res.status(500).send({
            error: "errotamanhocelular"
        })
    }

    //Verifica o tamanho do campo senha
    if (req.body.senha.length < 8) {
        return res.status(500).send({
            error: "errotamanhosenha"
        })
    }

    if (ValidationNumber(req.body.celular)) {
        return res.status(500).send({
            error: "errocelularinvalido"
        })
    }

    if (ValidationNumber(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfinvalido"
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
                `UPDATE tbl_Paciente
                    SET
                    dt_Nascimento = ?,
                    nome = ?,
                    telefone = ?,
                    tp_sanguineo= ?,
                    alergia = ?,
                    endereco = ?,
                    celular = ?,
                    ativo = ?,
                    senha = ?,
                    alt_senha = ?,
                    foto = ?
                    WHERE cpf = ?`,
                [req.body.dt_Nascimento, req.body.nome, req.body.telefone, req.body.tp_sanguineo, req.body.alergia, req.body.endereco, req.body.celular, req.body.ativo, hash, req.body.alt_senha, req.body.foto, req.body.cpf],
                (error, resultado, fields) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Paciente Atualizado'
                    })
                }
            )

        })
    })
}

//Deleta os dados de um determinado paciente
exports.deletePaciente = (req, res, next) => {

    if (isNullOrWhitespace(req.body.cpf)) {
        return res.status(500).send({
            error: "errocpfvazio"
        })
    }

    //Verifica o tamanho do campo CPF
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Paciente WHERE cpf = ?`,
            [req.body.cpf],
            (error, resultado, fields) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Paciente excluído com sucesso'
                })
            }
        )
    })
}

//Faz a autenticação de um paciente e gera um token
exports.logarPaciente = (req, res, next) => {

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
        const query = `SELECT * FROM tbl_Paciente WHERE email = ?`;

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
                        id_Paciente: results[0].id_Paciente,
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