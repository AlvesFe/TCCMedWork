//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Medico
const medicoController = require('../controller/medico-validation');

//Chamando a model da tabela Medico
const medicoModel = require('../model/medico-model');

//Chamando a middleware da tabela Medico
const medicoMiddleware = require('../middleware/route_medico');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', medicoMiddleware.postMedico, medicoController.postMedico, medicoModel.postMedico);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', medicoMiddleware.getMedicos, medicoModel.getMedicos);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', medicoMiddleware.getMedico, medicoController.getMedico, medicoModel.getMedico);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', medicoMiddleware.patchMedico, medicoController.patchMedico, medicoModel.patchMedico);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', medicoMiddleware.deleteMedico, medicoController.deleteMedico, medicoModel.deleteMedico);

//LOGAR
router.post('/login', medicoController.logarMedico, medicoModel.logarMedico);

router.post('/recuperarsenha', medicoController.recuperarSenha, medicoModel.recuperarSenha)

router.post('/confirmetoken', medicoController.confirmetoken)

router.patch('/resetarsenha', medicoController.restSenha, medicoModel.resetsenha)

module.exports = router;