//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const hospitalController = require('../validations/hospital-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', hospitalController.postHospital);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', hospitalController.getHospitais);
//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', hospitalController.getHospital);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', hospitalController.patchHospital);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', hospitalController.deleteHospital);

//Metodo de Login
router.post('/login', hospitalController.logarHospital);

module.exports = router;