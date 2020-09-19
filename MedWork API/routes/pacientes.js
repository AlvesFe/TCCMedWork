/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade de Paciente do projeto MEDWORK,
    Toda manipulação de dados dp paciente feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', (req, res, next) => {

    const paciente = {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome
    }

    res.status(201).send({
        mensagem: 'Usando POST dentro da rota de pacientes',
        paciente: paciente
    })
})

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', (req, res, next) => {

    res.status(200).send({
        mensagem: 'Usando GET dentro da rota de pacientes'
    })
})

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_paciente', (req, res, next) => {

    const id = req.params.id_paciente

    if (id === "a") {
        res.status(200).send({
            mensagem: 'a',
            id: id
        })
    }
    else {
        res.status(200).send({
            mensagem: 'Testando GET com Parametros',
            id: id
        })
    }

})

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', (req, res, next) => {

    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de pacientes'
    })
})

//DELETE - Apaga um valor existente da tabela do banco de dados

router.delete('/', (req, res, next) => {

    res.status(201).send({
        mensagem: 'Usando DELETE dentro da rota de pacientes'
    })
})

module.exports = router;