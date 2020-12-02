//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');
const { response } = require('express');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

exports.postCompra = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        const id_Compra = bcrypt.hashSync(Date.now().toString(), 10);
        const cod_fiscal = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query('SELECT estoque FROM tbl_Remedio_Farmacia WHERE fk_id_Farmacia = ? AND fk_id_Remedio = ?', [req.body.fk_id_Farmacia, req.body.fk_id_Remedio],
            ((error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result[0].estoque >= req.body.quantidade) {
                    const Estoque = (result[0].estoque - req.body.quantidade);
                    conn.query(
                        'INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, valorRecebido, valorDevolvido, tipo, endereco, fk_id_Farmacia, fk_id_Paciente, fk_id_Remedio)VALUES(?,?,?,?,?,?,?,?,?,?)', [id_Compra, cod_fiscal, req.body.quantidade, req.body.valorRecebido, req.body.valorDevolvido, req.body.tipo, req.body.endereco, req.body.fk_id_Farmacia, req.body.fk_id_Paciente, req.body.fk_id_Remedio],
                        (error, resultado, field) => {
                            if (error) { return res.status(500).send({ error: error }) }

                            conn.query('UPDATE tbl_remedio_farmacia SET estoque = ? WHERE fk_id_Farmacia = ? AND fk_id_Remedio = ?', [Estoque, req.body.fk_id_Farmacia, req.body.fk_id_Remedio],
                                (error, resultado, field) => {
                                    conn.release()
                                    res.status(201).send({
                                        mensagem: 'Compra Cadastrada',
                                        id_Compra: id_Compra
                                    })
                                    if (error) { return res.status(500).send({ error: error }) }
                                })
                        }
                    )
                } else {
                    res.status(500).send({
                        error: 'Estoque Insuficiente',
                    })
                }
            })
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Compra WHERE id_Compra = ?', [req.body.id_Compra],
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
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE tbl_Compra
            SET
            quantidade = ?
            valorRecebido = ?, 
            valorDevolvido = ?,
            status_pedido = ?
            WHERE id_Compra = ?`, [req.body.quantidade, req.body.valorRecebido, req.body.valorDevolvido, req.body.status, req.body.id_Compra],
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

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Compra WHERE id_Compra = ?`, [req.body.id_Compra],
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

exports.getCompraFarmacia = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT cp.*, rm.*, pc.nome As paciente, pc.cpf FROM tbl_compra AS cp
        INNER JOIN tbl_remedio AS rm ON id_Remedio = fk_id_Remedio 
        INNER JOIN tbl_Paciente AS pc ON id_Paciente =  fk_id_Paciente
        WHERE status_pedido = ? AND fk_id_Farmacia  = ?`, [req.body.status, req.body.id_Farmacia],
            (err, response, filed) => {
                conn.release()
                if (err) { return res.status(500).send({ error: err }) }
                res.status(200).send({
                    success: 1,
                    Compras: response
                })
            })
    })
}

exports.getAllComprasFarmacia = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(`SELECT * FROM tbl_Compra WHERE fk_id_Farmacia = ?`, [req.body.id_Farmacia], 
        (err, response, field) => {
            conn.release()
            if (err) { return res.status(500).send({ error: err }) }

            res.status(200).send({
                success: 1,
                Compras: response
            })
        })

    })
}

exports.AlterarStatus = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(`UPDATE tbl_compra SET status_pedido = ? WHERE id_Compra = ?`, [req.body.status, req.body.id_Compra],
        (err, response, fiedl) => {
            if (err) { return res.status(500).send({ error: err }) }

            res.status(200).send({
                success:1,
                Compras: response
            })

        })
    })

}