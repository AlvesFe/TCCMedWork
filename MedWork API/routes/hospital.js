//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Camda de middleware que verifica se o usuario apropriado está logado
const login = require('../middleware/loginMedWork');

//Camada de validação do hospital
const hospitalController = require('../controller/hospital-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', login, hospitalController.postHospital);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', login, hospitalController.getHospitais);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', login, hospitalController.getHospital);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', login, hospitalController.patchHospital);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', login, hospitalController.deleteHospital);

//Metodo de Login
router.post('/login', login, hospitalController.logarHospital);

module.exports = router;