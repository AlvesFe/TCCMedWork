//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

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


exports.postMedico = (req, res, next) => {

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

                            const foto = () => {
                                if (req.file) {
                                    return req.file.filename
                                }
                                else {
                                    return "default.png"
                                }
                            }

                            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

                                const id_Medico = bcrypt.hashSync(Date.now().toString(), 10);
                                conn.query(
                                    'INSERT INTO tbl_Medico (id_Medico, foto, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                                    [id_Medico, foto(), req.body.crm, req.body.email, req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, hash, req.body.tp_sanguineo, req.body.cpf, req.body.rg, req.body.fk_id_Hospital],
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Medico WHERE crm = ?',
            [req.body.crm],
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`SELECT * FROM tbl_Medico WHERE id_Medico = ?`, [req.body.id_Medico], async (error, resposta, field) => {
            if (resposta[0]) {
                const foto = () => {
                    if (req.file) {
                        console.log(req.file)
                        return req.file.filename
                    }
                    else {
                        return "default.png"
                    }
                }
                if (resposta[0].senha === req.body.senha) {
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
                        [req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, req.body.ativo, foto(), resposta[0].senha, req.body.tp_sanguineo, req.body.id_Medico],
                        (error, resultado, field) => {
                            conn.release()
                            if (error) { return res.status(500).send({ error: error }) }

                            res.status(202).send({
                                mensagem: 'Medico Atualizado',
                                response: resultado.insertId
                            })
                        }
                    )

                }
                else {
                    const senha = await bcrypt.hash(req.body.senha, 10);
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
                        [req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, req.body.ativo, foto(), senha, req.body.tp_sanguineo, req.body.id_Medico],
                        (error, resultado, field) => {
                            conn.release()
                            console.log("AQUI")
                            console.log(foto())
                            if (error) { return res.status(500).send({ error: error }) }

                            res.status(202).send({
                                mensagem: 'Medico Atualizado',
                                response: resultado.insertId
                            })
                        }
                    )
                }
            }
            else {
                if (error) { return res.status(500).send({ error: error }) }
            }
        })
    })
}

exports.deleteMedico = (req, res, next) => {

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
                        nome: results[0].nome,
                        tipo: "medico",
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

exports.recuperarSenha = async (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM tbl_Medico WHERE email = ?`;

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
                        `UPDATE tbl_Medico
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