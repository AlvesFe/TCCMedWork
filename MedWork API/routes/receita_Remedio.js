
//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Receita_Remedio
const receitaRemedioController = require('../controller/receita_Remedio-validation');

//Chamando a controller da tabela Receita_Remedio
const receitaRemedioModel = require('../model/receita_Remedio-model');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', receitaRemedioController.postReceitaRemedio, receitaRemedioModel.postReceitaRemedio);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', receitaRemedioModel.getReceitasRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', receitaRemedioController.getReceitaRemedio, receitaRemedioModel.getReceitasRemedio);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', receitaRemedioController.patchReceitaRemedio, receitaRemedioModel.patchReceitaRemedio);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', receitaRemedioController.deleteReceitaRemedio, receitaRemedioModel.deleteReceitaRemedio);

module.exports = router;