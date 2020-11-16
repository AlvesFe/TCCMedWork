//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');

const handlebars = require('handlebars');

const fs = require('fs');

const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    })
}

function SendMail(transport, data) {

    readHTMLFile(__dirname + '/../src/template/AlterarSenha.html', function (err, html) {
        const template = handlebars.compile(html);
        const parametros = {
            token: data.token
        };
        const htmlTosend = template(parametros);
        transport.sendMail({
            from: "MedWork <Medwork.developer@gmail.com>",
            to: data.email,
            text: '',
            subject: 'Alterar Senha - MedWork',
            html: htmlTosend
        })
    })
    return true;
}


exports.postRecepcionista = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM tbl_Recepcionista WHERE cpf = ? OR rg = ? OR email = ?', [req.body.cpf, req.body.rg, req.body.email],
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Recepcionista WHERE cpf = ?',
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

exports.patchRecepcionista = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`SELECT * FROM tbl_Recepcionista WHERE id_Recepcionista = ?`, [req.body.id_Recepcionista], async (error, resultado, field) => {
            if(resultado[0]){
                if(resultado[0].senha === req.body.senha){
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
                        [req.body.nome, req.body.dt_nascimento, req.body.tp_sanguineo, req.body.ativo, req.body.endereco, resultado[0].senha, req.body.celular, req.body.telefone, req.body.id_Recepcionista],
                        (error, resultado, field) => {
                            conn.release()
        
                            if (error) { return res.status(500).send({ error: error }) }
        
                            res.status(202).send({
                                mensagem: 'Recepcionista Atualizado',
                                response: resultado.insertId
                            })
                        }
                    )
                }
                else{
                    const senha = await bcrypt.hash(req.body.senha, 10);

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
                        [req.body.nome, req.body.dt_nascimento, req.body.tp_sanguineo, req.body.ativo, req.body.endereco, senha, req.body.celular, req.body.telefone, req.body.id_Recepcionista],
                        (error, resultado, field) => {
                            conn.release()
        
                            if (error) { return res.status(500).send({ error: error }) }
        
                            res.status(202).send({
                                mensagem: 'Recepcionista Atualizado',
                                response: resultado.insertId
                            })
                        }
                    )
                }
            }
            else{
                return res.status(500).send({ error: "Usuario Não encontrado" }) 
            }
        })
    })
}

exports.deleteRecepcionista = (req, res, next) => {

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

exports.logarRecepcionista = (req, res, next) => {

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
                        nome: results[0].nome,
                        tipo: "recepcionista",
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

exports.recuperarSenha = async (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_Recepcionista WHERE email = ?`;

        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length <= 0) {
                return res.status(401).send({ mensagem: 'Usuario não Encontrado' })
            }
            const token = jwt.sign({
                email: req.body.email
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "20m"
                })

            data = {
                email: req.body.email,
                token
            }
            const transport = nodemailer.createTransport({
                host: process.env.API_NODEMAILER_HOST,
                port: process.env.API_NODEMAILER_PORT,
                secure: false,
                auth: {
                    user: process.env.API_NODEMAILER_USER,
                    pass: process.env.API_NODEMAILER_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            if (SendMail(transport, data)) {
                res.status(200).send({
                    success: "Verifique a Caixa de Email"
                })
            };
        })
    })
}

exports.resetsenha = (req, res, next) => {

    try {
        const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
        if (decode) {
            mysql.getConnection((error, conn) => {

                if (error) { return res.status(500).send({ error: error }) }

                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                    conn.query(
                        `UPDATE tbl_Recepcionista
                            SET
                            senha = ?
                            WHERE email = ?`,
                        [hash, decode.email],
                        (error, resultado, fields) => {
                            conn.release()

                            if (error) { return res.status(500).send({ error: error }) }

                            res.status(202).send({
                                mensagem: 'Senha Atualizado'
                            })
                        }
                    )

                })
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            error: "errotokeninvalido"
        })
    }

}