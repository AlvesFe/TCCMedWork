//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const histReceitaRemedioController = require('../validations/hist_Receita_Remedio-validation');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histReceitaRemedioController.getHistoricosReceitaRemedio);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/:get', histReceitaRemedioController.getHistoricoReceitaRemedio)

module.exports = router;