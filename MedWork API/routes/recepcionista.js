//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const recepcionistaController = require('../validations/recepcionista-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', recepcionistaController.postRecepcionista);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', recepcionistaController.getRecepcionistas);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Recepcionista', recepcionistaController.getRecepcionista);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', recepcionistaController.patchRecepcionista);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', recepcionistaController.deleteRecepcionista);

//Metodo de Login
router.post('/login', recepcionistaController.LogarRecepcionista);

module.exports = router;