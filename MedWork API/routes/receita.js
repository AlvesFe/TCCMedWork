//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Receita
const receitaController = require('../controller/receita-validation');

//Chamando a model da tabela Receita
const receitaModel = require('../model/receita-model');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', receitaController.postReceita, receitaModel.postReceita);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', receitaModel.getReceitas)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', receitaController.getReceita, receitaModel.getReceita)

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', receitaController.patchReceita, receitaModel.patchReceita);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', receitaController.deleteREceita, receitaModel.deleteReceita);

module.exports = router;