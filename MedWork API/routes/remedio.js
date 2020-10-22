//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const remedioController = require('../validations/remedio-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', remedioController.postRemedio);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', remedioController.getRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Remedio', remedioController.getRemedio);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', remedioController.patchRemedio);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', remedioController.deleteRemedio);

module.exports = router;