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

const farmaciaController = require('../validations/farmacia-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', farmaciaController.postFarmacia);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', farmaciaController.getFarmacias);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', farmaciaController.getFarmacia);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', farmaciaController.patchFarmacia);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', farmaciaController.deleteFarmacia);

//Metodo de Login
router.post('/login', farmaciaController.logarFarmacia);

module.exports = router;