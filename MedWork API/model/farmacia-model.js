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

exports.postFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT fm.*, cnpj FROM tbl_farmacia AS fm
        INNER JOIN tbl_Estabelecimentos ON id_Estabelecimento = fk_id_Estabelecimento 
        WHERE email = ? OR cnpj = ?`, [req.body.email, req.body.cnpj],
            (error, resultado, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (!resultado[0]) {
                    mysql.getConnection((error, conn) => {
                        const foto = () => {
                            if (req.file) {
                                return req.file.filename
                            }
                            else {
                                return "default.png"
                            }
                        }
                        if (error) { return res.status(500).send({ error: error }) }
                        const id_Estabelecimento = bcrypt.hashSync(Date.now().toString(), 10);
                        conn.query(`INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) VALUES (?,?,?)`,
                            [id_Estabelecimento, req.body.cnpj, 'farmacia'], (error, resultado, field) => {
                                if (error) { return res.status(500).send({ error: error }) }
                                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                                    const id_Farmacia = bcrypt.hashSync(Date.now().toString(), 10);

                                    conn.query(
                                        'INSERT INTO tbl_Farmacia(id_Farmacia, foto, nome, telefone, endereco, detalhes, senha, taxa, email, fk_id_MedWork, fk_id_Estabelecimento)VALUES(?,?,?,?,?,?,?,?,?,?,?)',
                                        [id_Farmacia, foto(), req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, hash, req.body.taxa, req.body.email, req.body.fk_id_MedWork, id_Estabelecimento],
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
            `SELECT fm.*, cnpj FROM tbl_farmacia AS fm
            INNER JOIN tbl_Estabelecimentos ON id_Estabelecimento = fk_id_Estabelecimento`,
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT fm.*, cnpj FROM tbl_farmacia AS fm
            INNER JOIN tbl_Estabelecimentos ON id_Estabelecimento = fk_id_Estabelecimento
            WHERE cnpj = ?`,
            [req.body.cnpj],
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
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`SELECT fm.*, cnpj FROM tbl_farmacia AS fm
        INNER JOIN tbl_Estabelecimentos ON id_Estabelecimento = fk_id_Estabelecimento
        WHERE id_Farmacia = ?`, [req.body.id_Farmacia], async (error, resultado, field) => {
            if (error) { return res.status(500).send({ error: error }) }
            const foto = () => {
                if (req.file) {
                    return req.file.filename
                }
                else {
                    return "default.png"
                }
            }
            if (resultado[0]) {
                if (resultado[0].senha === req.body.senha) {

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
                        [req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, req.body.ativo, resultado[0].senha, foto(), req.body.id_Farmacia],
                        (error, resultado, field) => {
                            conn.release()

                            if (error) { return res.status(500).send({ error: error }) }

                            res.status(202).send({
                                mensagem: 'Farmacia Atualizada',
                                response: resultado.insertId
                            })
                        }
                    )

                }
                else {
                    const senha = await (bcrypt.hash(req.body.senha, 10));
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
                        [req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, req.body.ativo, senha, foto(), req.body.id_Farmacia],
                        (error, resultado, field) => {
                            conn.release()

                            if (error) { return res.status(500).send({ error: error }) }

                            res.status(202).send({
                                mensagem: 'Farmacia Atualizada',
                                response: resultado.insertId
                            })
                        }
                    )
                }
            }
        })
    })
}

exports.deleteFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT fm.*, cnpj FROM tbl_Farmacia AS fm
        INNER JOIN tbl_Estabelecimentos ON id_Estabelecimento = fk_id_Estabelecimento
        WHERE id_Farmacia = ?`, [req.body.id_Farmacia],
        (error, result, field) => {
            conn.query(
                `DELETE FROM tbl_Farmacia WHERE id_Farmacia = ?`,
                [result[0].id_Farmacia],
                (error, resultado, field) => {
                    conn.query('DELETE FROM tbl_Estabelecimentos WHERE id_Estabelecimento = ?', [result[0].fk_id_Estabelecimento],
                    (error, result, field) => {
                        conn.release()
    
                        if (error) { return res.status(500).send({ error: error }) }
        
                        res.status(202).send({
                            mensagem: 'Farmacia excluída com sucesso'
                        })
                    }) 
                }
            )
        }) 
    })
}

exports.logarFarmacia = (req, res, next) => {

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
                        nome: results[0].nome,
                        tipo: "farmacia",
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

exports.recuperarSenha = async (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_farmacia WHERE email = ?`;

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
                        `UPDATE tbl_farmacia
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