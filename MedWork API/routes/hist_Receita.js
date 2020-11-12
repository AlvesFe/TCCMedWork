

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela hist_Receita
const histReceitaController = require('../controller/hist_Receita-validation');

//Chamando a model da tabela hist_Receita
const histReceitaModel = require('../model/hist_Receita-model');

//Chamando a Middleware Historicos
const histConsultaMiddleware = require('../middleware/routes_historicos');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histConsultaMiddleware.allHistorico, histReceitaModel.getReceitas)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histConsultaMiddleware.allHistorico, histReceitaController.getReceita, histReceitaModel.getReceita)

module.exports = router;