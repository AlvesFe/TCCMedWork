/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Receita_Remedio do projeto MEDWORK,
    Toda manipulação de dados da Receita_Remedio feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//FUNÇOES GLOBAIS
//Função que verifica se determinado valor está em branco ou só com espaços
function isNullOrWhitespace(field) {
    return !field 
}

// Verifica se é um Número
function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

exports.postReceitaRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    if (ValidationNumber(req.body.Quantidade)) {
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        const id_Receita_Remedio = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)VALUES(?, ?,?,?)',
            [id_Receita_Remedio, req.body.Quantidade, req.body.fk_id_Receita, req.body.fk_id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Receita_Remedio Cadastrada',
                    id_Receita_Remedio: id_Receita_Remedio
                })
            }
        )
    })
}

exports.getReceitasRemedios = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita_Remedio',
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

exports.getReceitaRemedio = (req, res, next) => {

    if(isNullOrWhitespace(req.params.id_Receita_Remedio)){
        return res.status(500).send({
            error: "erroidreceitaremediovazio"
        })
    }

    if(req.params.id_Receita_Remedio.length !== 60){
        return res.status(500).send({
            error: "erroidreceitaremedioinvalido"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Receita_Remedio WHERE id_Receita_Remedio = ?',
            [req.params.id_Receita_Remedio],
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
exports.patchReceitaRemedio = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if(ValidationNumber(req.body.Quantidade)){
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    if(req.body.id_Receita_Remedio.length !== 60){
        return res.status(500).send({
            error: "erroidreceitaremedioinvalida"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Receita_Remedio
            SET
            Quantidade = ?
            WHERE id_Receita_Remedio = ?`,
            [req.body.Quantidade, req.body.id_Receita_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Receita_Remedio Atualizada',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteReceitaRemedio = (req, res, next) => {

    if(isNullOrWhitespace(req.body.id_Receita_Remedio)){
        return res.status(500).send({
            error: "erroidreceitaremediovazio"
        })
    }

    if(req.body.id_Receita_Remedio.length !== 60){
        return res.status(500).send({
            error: "erroidreceitaremedioinvalida"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Receita_Remedio WHERE id_Receita_Remedio = ?`,
            [req.body.id_Receita_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Receita_Remedio excluída com sucesso'
                })
            }
        )
    })

}