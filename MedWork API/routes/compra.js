/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Compra do projeto MEDWORK,
    Toda manipulação de dados da Compra feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Compra
const compraController = require('../controller/compra-validation');

//Chamando a Model da tabela Compra
const compraModel = require('../model/compra-model');

const compraMiddleware = require('../middleware/route_compra');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', compraMiddleware.postCompra, compraController.postCompra, compraModel.postCompra);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', compraMiddleware.getCompras, compraModel.getCompras);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', compraMiddleware.getCompra, compraController.getCompra, compraModel.getCompra);

//READ (GET'S) - Busca e exibe Itens da tabela do banco de dados
router.post('/getCompra', compraMiddleware.getCompra, compraController.GetCompraFarmacia, compraModel.getCompraFarmacia);

//READ (GET'S) - Busca e exibe Itens da tabela do banco de dados
router.post('/getAllCompra', compraMiddleware.getCompra, compraModel.getAllComprasFarmacia);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', compraMiddleware.patchCompra, compraController.patchCompra, compraModel.patchCompra);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', compraMiddleware.deleteCompra, compraController.deleteCompra, compraModel.deleteCompra);

module.exports = router;