/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Paciente do projeto MEDWORK,
    Toda manipulação de dados da Paciente feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Pacientes
const pacienteController = require('../controller/paciente-validations');

//Chamando a model da tabela Pacientes
const pacienteModel = require('../model/paciente-model');

//Chamando a middleware da tabela Pacientes
const pacienteMiddleware = require('../middleware/route_paciente');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', pacienteMiddleware.postPaciente, pacienteController.postPaciente, pacienteModel.postPaciente)

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', pacienteMiddleware.getPacientes, pacienteModel.getPacientes)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', pacienteMiddleware.getPaciente, pacienteController.getPaciente, pacienteModel.getPaciente)

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', pacienteMiddleware.patchPaciente, pacienteController.patchPaciente, pacienteModel.pacthPaciente)

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', pacienteMiddleware.deletePaciente, pacienteController.deletePaciente, pacienteModel.deletePaciente)

//Metodo de Login
router.post('/login', pacienteController.logarPaciente, pacienteModel.logarPaciente)

//Metodo de Recuperar Senha
router.post('/recuperarsenha', pacienteController.recuperarSenha, pacienteModel.recuperarSenha)

//Metodo de Recuperar Senha
router.post('/confirmetoken', pacienteController.confirmetoken)

//Metodo de Recuperar Senha
router.patch('/resetarsenha', pacienteController.resetsenha, pacienteModel.resetsenha)

module.exports = router;