/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade farmacia do projeto MEDWORK,
    Toda manipulação de dados da farmacia feitas pelo APP ou Site do projeto 
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
                'INSERT INTO tbl_Farmacia(nome, telefone, endereco, detalhes, cnpj, senha, email, fk_id_MedWork)VALUES(?,?,?,?,?,?,?,?)',
                [req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, req.body.cnpj, hash, req.body.email, req.body.fk_id_MedWork],
                (error, resultado, field) => {
                    conn.release()
    
                    if (error) { return res.status(500).send({ error: error }) }
    
                    res.status(201).send({
                        mensagem: 'Farmacia Cadastrado',
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
})

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Farmacia', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Farmacia WHERE id_Farmacia = ?',
            [req.params.id_Farmacia],
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
            [req.body.nome, req.body.telefone, req.body.endereco, req.body.detalhes, req.body.ativo, req.body.senha, req.body.foto, req.body.id_Farmacia],
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

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', (req, res, next) => {

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
})

module.exports = router;