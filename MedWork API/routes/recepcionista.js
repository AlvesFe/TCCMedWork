/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Recepcionista do projeto MEDWORK,
    Toda manipulação de dados do recepcionista feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO tbl_Recepcionista (nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)VALUES(?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.nome, req.body.dt_nascimento, req.body.tp_sanguineo, req.body.endereco, req.body.cpf, req.body.senha, req.body.rg, req.body.email, req.body.celular, req.body.telefone, req.body.fk_id_Hospital],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Recepcionista Cadastrado',
                    id_Medwork: resultado.insertId
                })
            }
        )
    })
})

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', (req, res, next) => {

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
})

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Recepcionista', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Recepcionista WHERE id_Recepcionista = ?',
            [req.params.id_Recepcionista],
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
            [req.body.nome, req.body.dt_nascimento, req.body.tp_sanguineo, req.body.ativo, req.body.endereco, req.body.senha, req.body.celular, req.body.telefone, req.body.id_Recepcionista],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Recepcionista Atualizado',
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
})

module.exports = router;