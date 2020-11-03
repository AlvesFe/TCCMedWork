//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

exports.postFarmacia = (req, res, next) => {

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