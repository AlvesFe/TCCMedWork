
//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const receitaRemedioController = require('../validations/receita_Remedio-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', receitaRemedioController.postReceitaRemedio);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', receitaRemedioController.getReceitasRemedios);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Receita_Remedio', receitaRemedioController.getReceitaRemedio);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', receitaRemedioController.patchReceitaRemedio);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', receitaRemedioController.deleteReceitaRemedio);

module.exports = router;