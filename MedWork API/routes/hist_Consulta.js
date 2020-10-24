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

//Importação do Banco de dados MySql
const mysql = require('../mysql').pool;

const histConsultaController = require('../validations/hist_Consulta-validation')

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', histConsultaController.GetHistoricoConsultas);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', histConsultaController.GetHistoricoConsulta);

module.exports = router;