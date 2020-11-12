//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Remedio_Farmacia
const remedioFarmaciaController = require('../controller/remedio_Farmacia-validation');

//Chamando a model da tabela Remedio_Farmacia
const remedioFarmaciaModel = require('../model/remedio_Farmacia-model');

//Chamando a Middleware da tabela Remedio_Farmacia
const remedioFarmaciaMiddleware = require('../middleware/route_remedio_Farmacia');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', remedioFarmaciaMiddleware.postremedioFarmacia, remedioFarmaciaController.postRemedioFarmacia, remedioFarmaciaModel.postRemedioFarmacia);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', remedioFarmaciaMiddleware.getRemedioFarmacias, remedioFarmaciaModel.getRemediosFarmacias);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', remedioFarmaciaMiddleware.getRemedioFarmacia, remedioFarmaciaController.getRemedioFarmacia, remedioFarmaciaModel.getRemediosFarmacia);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', remedioFarmaciaMiddleware.patchRemedioFarmacia, remedioFarmaciaController.patchRemedioFarmacia, remedioFarmaciaModel.patchRemedioFarmacia);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', remedioFarmaciaMiddleware.deleteRemedioFarmacia, remedioFarmaciaController.deleteREmedioFarmacia, remedioFarmaciaModel.deleteRemedioFarmacia);

module.exports = router;