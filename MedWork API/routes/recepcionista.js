//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Recepcionista
const recepcionistaController = require('../controller/recepcionista-validation');

//Chamando a model da tabela Recepcionista
const recepcionistaModel = require('../model/recepcionista-model');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', recepcionistaController.postRecepcionista, recepcionistaModel.postRecepcionista);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', recepcionistaModel.getRecepcionistas);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', recepcionistaController.getRecepcionista, recepcionistaModel.getRecepcionista);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', recepcionistaController.patchRecepcionista, recepcionistaModel.patchRecepcionista);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', recepcionistaController.deleteRecepcionista, recepcionistaModel.deleteRecepcionista);

//Metodo de Login
router.post('/login', recepcionistaController.LogarRecepcionista, recepcionistaModel.logarRecepcionista);

module.exports = router;