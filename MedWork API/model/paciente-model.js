//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postPaciente = (req, res, next) => {

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

exports.getPaciente = (req, res, next) => {

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

exports.pacthPaciente = (req, res, next) => {
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

exports.deletePaciente = (req, res, next) => {

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

exports.logarPaciente = (req, res, next) => {

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
                        nome: results[0].nome,
                        cpf: results[0].cpf,
                        tipo: "paciente",
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