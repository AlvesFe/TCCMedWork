//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a Controller da tabela hist_Hospital
const histHospitalController = require('../controller/hist_Hospital-validation');

//Chamando a model da tabela hist_Hospital
const histHospitalModel = require('../model/hist_Hospital-model');
//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histHospitalModel.getHistoricoHospitais);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histHospitalController.getHistoricoHospital, histHospitalModel.getHistoricoHospital);

module.exports = router;