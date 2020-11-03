//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Remedio
const remedioController = require('../controller/remedio-validation');

//Chamando a model da tabela Remedio
const remedioModel = require('../model/remedio-model');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', remedioController.postRemedio, remedioModel.postRemedio);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', remedioModel.getRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', remedioController.getRemedio, remedioModel.getRemedio);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', remedioController.patchRemedio, remedioModel.patchRemedio);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', remedioController.deleteRemedio, remedioModel.deleteRemedio);

module.exports = router;