
//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Receita_Remedio
const receitaRemedioController = require('../controller/receita_Remedio-validation');

//Chamando a model da tabela Receita_Remedio
const receitaRemedioModel = require('../model/receita_Remedio-model');

//Chamando a Middleware da tabela Receita_Remedio
const receitaRemedioMiddleware = require('../middleware/route_receita_Remedio');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', receitaRemedioMiddleware.postReceitaRemedio , receitaRemedioController.postReceitaRemedio, receitaRemedioModel.postReceitaRemedio);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', receitaRemedioMiddleware.getReceitaRemedios , receitaRemedioModel.getReceitasRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', receitaRemedioMiddleware.getReceitaRemedio, receitaRemedioController.getReceitaRemedio, receitaRemedioModel.getReceitasRemedio);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', receitaRemedioMiddleware.pathReceitaRemedio, receitaRemedioController.patchReceitaRemedio, receitaRemedioModel.patchReceitaRemedio);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', receitaRemedioMiddleware.deleteReceitaRemedio, receitaRemedioController.deleteReceitaRemedio, receitaRemedioModel.deleteReceitaRemedio);

module.exports = router;