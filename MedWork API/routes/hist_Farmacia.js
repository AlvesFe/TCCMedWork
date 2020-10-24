//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const histFarmaciaController = require('../validations/hist_Farmacia-validation');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histFarmaciaController.getHistoricoFarmacias);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histFarmaciaController.getHistoricoFarmacia);

module.exports = router;