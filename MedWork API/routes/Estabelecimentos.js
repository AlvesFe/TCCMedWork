/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Estabelecimentos do projeto MEDWORK,
    Toda manipulação de dados da Compra feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Establecimentos
const EstabelecimentosController = require('../controller/Estabelecimentos-validation');

//Chamando a Model da tabela Estabelecimentos
const EstabelecimentoModel = require('../model/Estabelecimentos-model');

//Chamando a Middleware de Estabelecimentos
const EstabelecimentoMiddleware = require('../middleware/route_Estabelecimentos');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', EstabelecimentoMiddleware.postEstabelecimento, EstabelecimentosController.postEstabelecimento, EstabelecimentoModel.postEstabelecimento);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', EstabelecimentoMiddleware.getEstabelecimentos, EstabelecimentoModel.getEstabelecimentos);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', EstabelecimentoMiddleware.getEstabelecimento, EstabelecimentosController.getEstabelecimento ,EstabelecimentoModel.getEstabelecimento);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', EstabelecimentoMiddleware.deleteEstabelecimentos , EstabelecimentosController.deleteEstabelecimento, EstabelecimentoModel.deleteEstabelecimento);

module.exports = router;