//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const receitaController = require('../validations/receita-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', receitaController.postReceita);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', receitaController.getReceitas)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Receita', receitaController.getReceita)

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', receitaController.patchReceita);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', receitaController.deleteREceita);

module.exports = router;