/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hospital do projeto MEDWORK,
    Toda manipulação de dados do hospital feitas pelo APP ou Site do projeto 
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

        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) =>{
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

            conn.query(
                'INSERT INTO tbl_Hospital (cnpj, nome, endereco, telefone, email, senha, fk_id_MedWork)VALUES(?,?,?,?,?,?,?)',
                [req.body.cnpj, req.body.nome, req.body.endereco, req.body.telefone, req.body.email, hash, req.body.fk_id_MedWork],
                (error, resultado, field) => {
                    conn.release()
    
                    if (error) { return res.status(500).send({ error: error }) }
    
                    res.status(201).send({
                        mensagem: 'Hospital Cadastrado',
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
            'SELECT * FROM tbl_Hospital',
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
router.get('/:id_Hospital', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Hospital WHERE id_Hospital = ?',
            [req.params.id_Hospital],
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
        conn.query(
            `UPDATE tbl_Hospital
                SET
                   nome = ?,
                   endereco = ?,
                   telefone = ?,
                   ativo = ?,
                   foto = ?,
                   senha = ?
                WHERE id_Hospital = ?`,
            [req.body.nome, req.body.endereco, req.body.telefone, req.body.ativo, req.body.foto, req.body.senha, req.body.id_Hospital],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Hospital Atualizado',
                    response: resultado.insertId
                })
            }
        )
    })
})

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        
        conn.query(
            `DELETE FROM tbl_Hospital WHERE id_Hospital = ?`,
            [req.body.id_Hospital],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Hospital excluído com sucesso'
                })
            }
        )
    })
})

module.exports = router;