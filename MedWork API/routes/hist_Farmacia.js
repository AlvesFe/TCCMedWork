//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a model da tabela hist_Farmacia
const histFarmaciaController = require('../controller/hist_Farmacia-validation');

//Chamando a model da tabela hist_Farmacia
const histFarmaciaModel = require('../model/hist_Farmacia-model');

//Chamando a Middleware Historicos
const histConsultaMiddleware = require('../middleware/routes_historicos');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histConsultaMiddleware.allHistorico, histFarmaciaModel.getHistoricoFarmacias);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histConsultaMiddleware.allHistorico, histFarmaciaController.getHistoricoFarmacia, histFarmaciaModel.getHistoricoFarmacia);

module.exports = router;