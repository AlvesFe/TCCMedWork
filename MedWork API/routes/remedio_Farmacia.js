//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const remedioFarmaciaController = require('../validations/remedio_Farmacia-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', remedioFarmaciaController.postRemedioFarmacia);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', remedioFarmaciaController.getRemediosFarmacias);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Remedio_Farmacia', remedioFarmaciaController.getRemedioFarmacia);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', remedioFarmaciaController.patchRemedioFarmacia);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', remedioFarmaciaController.deleteREmedioFarmacia);

module.exports = router;