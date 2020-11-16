//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Recepcionista
const recepcionistaController = require('../controller/recepcionista-validation');

//Chamando a model da tabela Recepcionista
const recepcionistaModel = require('../model/recepcionista-model');

//Chamando a Middleware da tabela Recepcionista
const recepcionistaMiddleware = require('../middleware/route_recepcionista');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', recepcionistaMiddleware.postRecepcionista, recepcionistaController.postRecepcionista, recepcionistaModel.postRecepcionista);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', recepcionistaMiddleware.getRecepcionistas, recepcionistaModel.getRecepcionistas);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', recepcionistaMiddleware.getRecepcionista, recepcionistaController.getRecepcionista, recepcionistaModel.getRecepcionista);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', recepcionistaMiddleware.patchRecepcionista, recepcionistaController.patchRecepcionista, recepcionistaModel.patchRecepcionista);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', recepcionistaMiddleware.deleteRecepcionista, recepcionistaController.deleteRecepcionista, recepcionistaModel.deleteRecepcionista);

//Metodo de Login
router.post('/login', recepcionistaController.LogarRecepcionista, recepcionistaModel.logarRecepcionista);

//Metodo de Recuperar Senha
router.post('/recuperarsenha', recepcionistaController.recuperarSenha, recepcionistaModel.recuperarSenha)

//Metodo de Recuperar Senha
router.post('/confirmetoken', recepcionistaController.confirmetoken)

//Metodo de Recuperar Senha
router.patch('/resetarsenha', recepcionistaController.resetsenha, recepcionistaModel.resetsenha)

module.exports = router;