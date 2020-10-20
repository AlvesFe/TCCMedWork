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

//Importação da controller de Pacientes
const pacienteController = require('../validations/paciente-validations');

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', pacienteController.postPaciente)

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', pacienteController.getPacientes)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.get('/:cpf_Paciente', pacienteController.getPaciente)

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', pacienteController.patchPaciente)

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', pacienteController.deletePaciente)

//Metodo de Login
router.post('/login', pacienteController.logarPaciente)

module.exports = router;