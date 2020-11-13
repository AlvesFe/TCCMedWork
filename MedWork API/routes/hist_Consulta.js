/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Hst_Consulta do projeto MEDWORK,
    Toda manipulação de dados da Hst_Consulta feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela hist_Consulta
const histConsultaController = require('../controller/hist_Consulta-validation')

//Chamando a model da tabela hist_Consulta
const histConsultaModel = require('../model/hist_Consulta-model')

//Chamando a Middleware Historicos
const histConsultaMiddleware = require('../middleware/routes_historicos');

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histConsultaMiddleware.allHistorico, histConsultaModel.getHistoricoConsultas);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histConsultaMiddleware.allHistorico, histConsultaController.getHistoricoConsulta, histConsultaModel.getHistoricoConsulta);

module.exports = router;