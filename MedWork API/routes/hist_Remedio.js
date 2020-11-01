//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const histRemedioController = require('../controller/hist_Remedio-validation');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histRemedioController.getRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histRemedioController.getRemedio);

module.exports = router;