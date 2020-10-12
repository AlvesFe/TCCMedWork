/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Paciente do projeto MEDWORK,
    Toda manipulação de dados da Paciente feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do JSON Web Token
const jwt = require('jsonwebtoken');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        //Criptografa a senha inserida pelo usuario no momento de cadastro
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                'INSERT INTO tbl_Paciente (dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
                [req.body.dt_Nascimento, req.body.nome, req.body.telefone, req.body.tp_sanguineo, req.body.alergia, req.body.rg, req.body.email, req.body.cpf, req.body.endereco, req.body.celular, hash, req.body.fk_id_Recepcionista],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(201).send({
                        mensagem: 'Paciente Cadastrado',
                        id_Farmacia: resultado.insertId
                    })
                }
            )
        })
    })
})

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', (req, res, next) => {

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
})

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Paciente', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Paciente WHERE id_Paciente = ?',
            [req.params.id_Paciente],
            (error, resultado, fields) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(200).send({
                    data: resultado
                })
            }
        )
    })
})

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', (req, res, next) => {

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
                    WHERE id_Paciente = ?`,
                [req.body.dt_Nascimento, req.body.nome, req.body.telefone, req.body.tp_sanguineo, req.body.alergia, req.body.endereco, req.body.celular, req.body.ativo, hash, req.body.alt_senha, req.body.foto, req.body.id_Paciente],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Paciente Atualizado',
                        response: resultado.insertId
                    })
                }
            )

        })
    })
})

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Paciente WHERE id_Paciente = ?`,
            [req.body.id_Paciente],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Paciente excluído com sucesso'
                })
            }
        )
    })
})

//Metodo de Login
router.post('/login', (req, res, next) => {

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
})

module.exports = router;