/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Remedio_Farmacia do projeto MEDWORK,
    Toda manipulação de dados da Remedio_Farmacia feitas pelo APP ou Site do projeto 
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
            'INSERT INTO tbl_Remedio_Farmacia (estoque, fk_id_Farmacia, fk_id_Remedio)VALUES(?,?,?)',
            [req.body.estoque, req.body.fk_id_Farmacia, req.body.fk_id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Remedio_Farmacia Cadastrada',
                    id_Farmacia: resultado.insertId
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
            'SELECT * FROM tbl_Remedio_Farmacia',
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
router.get('/:id_Remedio_Farmacia', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Remedio_Farmacia WHERE id_Remedio_Farmacia = ?',
            [req.params.id_Remedio_Farmacia],
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
            `UPDATE tbl_Remedio_Farmacia
            SET
            estoque = ?
            WHERE id_Remedio_Farmacia = ?`,
            [req.body.estoque, req.body.id_Remedio_Farmacia],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Remedio_Farmacia Atualizado',
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
            `DELETE FROM tbl_Remedio_Farmacia WHERE id_Remedio_Farmacia = ?`,
            [req.body.id_Remedio_Farmacia],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Remedio_Farmacia excluído com sucesso'
                })
            }
        )
    })
})

module.exports = router;