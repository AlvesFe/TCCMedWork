/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Consulta do projeto MEDWORK,
    Toda manipulação de dados da Consulta feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela consulta
const consultaController = require('../controller/consulta-validation');

//Chamando a model da tabela consulta
const consultaModel = require('../model/consulta-model');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', consultaController.postConsulta, consultaModel.postConsulta);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', consultaModel.getConsultas)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', consultaController.getConsulta, consultaModel.getConsulta)

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', consultaController.patchConsulta, consultaModel.patchConsulta);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', consultaController.deleteConsulta, consultaModel.deleteConsulta);

module.exports = router;