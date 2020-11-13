/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade ADM da MedWork do projeto MEDWORK,
    Toda manipulação de dados do administrador feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade AdmMedWork do projeto MEDWORK,
    Toda manipulação de dados da Paciente feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Importação da controller do AdmMedWork
const admMedWorkController = require('../controller/admMedWork-validations'); 

//Importação da Model do AdmMedWork
const admMedWorkModel = require('../model/admMedWork-model');

//Importação da Middleware do AdmMedWork
const admMedWorkMiddleware = require('../middleware/route_admMedWork');


//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', admMedWorkMiddleware.allAdmMedWork, admMedWorkController.postAdmMedwork, admMedWorkModel.postAdmMedwork);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/',  admMedWorkMiddleware.allAdmMedWork, admMedWorkModel.getAdmsMedWork);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', admMedWorkMiddleware.allAdmMedWork, admMedWorkController.getAdmMedWork, admMedWorkModel.getAdmMedWork);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', admMedWorkMiddleware.allAdmMedWork, admMedWorkController.patchAdmMedWork, admMedWorkModel.patchAdmMedWork);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', admMedWorkMiddleware.allAdmMedWork, admMedWorkController.deleteAdmMedWork, admMedWorkModel.deleteAdmMedWork);

//Metodo de Login
router.post('/login', admMedWorkController.logarAdmMedwork, admMedWorkModel.logarAdmMedwork);

module.exports = router;