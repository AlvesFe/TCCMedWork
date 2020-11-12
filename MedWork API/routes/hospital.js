//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Hospital
const hospitalController = require('../controller/hospital-validation');

//Chamando a model da tabela Hospital
const hospitalModel = require('../model/hospital-model');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', hospitalController.postHospital, hospitalModel.postHospital);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', hospitalModel.getHospitais);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', hospitalController.getHospital, hospitalModel.getHospital);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', hospitalController.patchHospital, hospitalModel.patchHospital);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', hospitalController.deleteHospital, hospitalModel.deleteHospital);

//Metodo de Login
router.post('/login', hospitalController.logarHospital, hospitalModel.logarHospital);

module.exports = router;