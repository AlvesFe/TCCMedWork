//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

exports.postEstabelecimento = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        const id_Estabelecimento = bcrypt.hashSync(Date.now().toString(), 10);
        conn.query(`INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) VALUES (?,?,?)`, [id_Estabelecimento, req.body.cnpj, req.body.Estabelecimento],
        (error, resultado, field) => {
            conn.release()

            if (error) { return res.status(500).send({ error: error }) }

            res.status(200).send({
                data: id_Estabelecimento,
                mensagem: "Estabelecimento Cadastrado"
            })
        })
    })
}

exports.getEstabelecimentos = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Estabelecimentos',
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

exports.getEstabelecimento = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM tbl_Estabelecimentos WHERE cnpj = ?',
            [req.body.cnpj],
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

exports.deleteEstabelecimento = (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM tbl_Estabelecimentos WHERE cnpj = ?`,
            [req.body.cnpj],
            (error, resultado, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Estabelecimento excluído com sucesso'
                })
            }
        )
    })

}