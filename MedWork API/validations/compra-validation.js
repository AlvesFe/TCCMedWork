//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

//FUNÇÕES GLOBAIS

function isNullOrWhitespace(field) {
    return !field || !field.trim();
}

function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

//Faz a validação e inserção no banco de dados de um novo cadastro da Compra
exports.postCompra = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.cod_fiscal.length != 40) {
        return res.status(500).send({
            error: "errotamanhocodigofiscal"
        })
    }

    if(ValidationNumber(req.body.quantidade)){
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    if(ValidationNumber(req.body.cod_fiscal)){
        return res.status(500).send({
            error: "errocodfiscalinvalida"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        const id_Compra = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(
            'INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, fk_id_Paciente, fk_id_Remedio)VALUES(?, ?,?,?,?)',
            [id_Compra, req.body.cod_fiscal, req.body.quantidade, req.body.fk_id_Paciente, req.body.fk_id_Remedio],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Compra Cadastrada',
                    id_Compra: id_Compra
                })
            }
        )
    })
}

exports.getCompras = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Compra',
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

exports.getCompra = (req, res, next) => {

    if (isNullOrWhitespace(req.params.id_Compra)) {
        return res.status(500).send({
            error: "erroidcompravazio"
        })
    }

    if (req.params.id_Compra.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidcompra"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Compra WHERE id_Compra = ?',
            [req.params.id_Compra],
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

exports.patchCompra = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.id_Compra.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidcompra"
        })
    }

    if(ValidationNumber(req.body.quantidade)){
        return res.status(500).send({
            error: "erroquantidadeinvalida"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Compra
            SET
            quantidade = ?
            WHERE id_Compra = ?`,
            [req.body.quantidade, req.body.id_Compra],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Compra Atualizada',
                    response: resultado.insertId
                })
            }
        )
    })
}

exports.deleteCompra = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Compra)) {
        return res.status(500).send({
            error: "erroidcompravazio"
        })
    }

    if (req.body.id_Compra.length != 60) {
        return res.status(500).send({
            error: "errotamanhoidcompra"
        })
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Compra WHERE id_Compra = ?`,
            [req.body.id_Compra],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Compra excluída com sucesso'
                })
            }
        )
    })
}