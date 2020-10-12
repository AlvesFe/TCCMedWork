/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade ADM da MedWork do projeto MEDWORK,
    Toda manipulação de dados do administrador feitas pelo APP ou Site do projeto 
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

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                'INSERT INTO tbl_MedWork (nome, email, senha, cnpj)VALUES(?,?,?,?)',
                [req.body.nome, req.body.email, hash, req.body.cnpj],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(201).send({
                        mensagem: 'Usuário Cadastrado',
                        id_Medwork: resultado.insertId
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
})

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_admMedWork', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_MedWork WHERE id_MedWork = ?',
            [req.params.id_admMedWork],
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
                `UPDATE tbl_MedWork
                    SET
                        nome = ?,
                        senha = ?,
                        ativo = ?,
                        foto = ?
                    WHERE id_MedWork = ?`
                ,
                [req.body.nome, hash, req.body.ativo, req.body.foto, req.body.id_MedWork],
                (error, resultado, field) => {
                    conn.release()

                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Usuário Atualizado'
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
            `DELETE FROM tbl_MedWork WHERE id_MedWork = ?`,
            [req.body.id_MedWork],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Usuário excluído com sucesso'
                })
            }
        )
    })
})

module.exports = router;