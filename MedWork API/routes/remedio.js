//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Remedio
const remedioController = require('../controller/remedio-validation');

//Chamando a model da tabela Remedio
const remedioModel = require('../model/remedio-model');

//Chamando a Midlleware da tabela Remedio
const remedioMiddleware = require('../middleware/route_remedio');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', remedioMiddleware.postRemedio, remedioController.postRemedio, remedioModel.postRemedio);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', remedioMiddleware.getRemedios, remedioModel.getRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', remedioMiddleware.getRemedio, remedioController.getRemedio, remedioModel.getRemedio);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/getAllRemedios', remedioMiddleware.getRemedio, remedioModel.getAllRemediosFarmacia);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', remedioMiddleware.patchRemedio, remedioController.patchRemedio, remedioModel.patchRemedio);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', remedioMiddleware.deleteRemedio, remedioController.deleteRemedio, remedioModel.deleteRemedio);

module.exports = router;