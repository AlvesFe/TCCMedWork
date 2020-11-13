//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela hist_Remedio
const histRemedioController = require('../controller/hist_Remedio-validation');

//Chamando a model da tabela hist_Remedio
const histRemedioModel = require('../model/hist_Remedio-model');

//Chamando a Middleware Historicos
const histConsultaMiddleware = require('../middleware/routes_historicos');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histConsultaMiddleware.allHistorico, histRemedioModel.getRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histConsultaMiddleware.allHistorico, histRemedioController.getRemedio, histRemedioModel.getRemedio);

module.exports = router;