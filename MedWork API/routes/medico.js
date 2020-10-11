/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Medico do projeto MEDWORK,
    Toda manipulação de dados da Medico feitas pelo APP ou Site do projeto 
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
                'INSERT INTO tbl_Medico (crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
                [req.body.crm, req.body.email, req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, hash, req.body.tp_sanguineo, req.body.cpf, req.body.rg, req.body.fk_id_Hospital],
                (error, resultado, field) => {
                    conn.release()
    
                    if (error) { return res.status(500).send({ error: error }) }
    
                    res.status(201).send({
                        mensagem: 'Medico Cadastrado',
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
})

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Medico', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Medico WHERE id_Medico = ?',
            [req.params.id_Medico],
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
            [req.body.nome, req.body.especialidade, req.body.telefone, req.body.celular, req.body.dt_Nascimento, req.body.ativo, req.body.foto, req.body.senha, req.body.tp_sanguineo, req.body.id_Medico],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Medico Atualizado',
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
})

module.exports = router;