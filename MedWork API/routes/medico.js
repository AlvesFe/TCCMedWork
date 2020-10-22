//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

const medicoController = require('../validations/medico-validation');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', medicoController.postMedico);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', medicoController.getMedicos);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:id_Medico', medicoController.getMedico);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', medicoController.patchMedico);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', medicoController.deleteMedico);

//LOGAR
router.post('/login', medicoController.logarMedico);

module.exports = router;