

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const histReceitaController = require('../controller/hist_Receita-validation');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histReceitaController.getReceitas)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histReceitaController.getReceita)

module.exports = router;