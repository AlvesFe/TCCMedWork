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

//Importação da biblioteca Bcrypt
const bcrypt = require('bcrypt');

//Chamando a middleware da tabela Pacientes
const pacienteMiddleware = require('../middleware/route_paciente');

//Importando Multer para upload de fotos
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './uploads/paciente')
    },
    filename: async function(req, file, callback){
        callback(null, new Date().getTime().toString()+'.' + file.originalname.split('.').pop())
    }
})

const fileFilter = (req, file, callback) => {

    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        callback(null, true);
    }
    else{
        callback(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits:{
        fieldSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', pacienteMiddleware.postPaciente, upload.single('image'), pacienteController.postPaciente, pacienteModel.postPaciente)

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', pacienteMiddleware.getPacientes, pacienteModel.getPacientes)

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', pacienteMiddleware.getPaciente, pacienteController.getPaciente, pacienteModel.getPaciente)

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', pacienteMiddleware.patchPaciente, upload.single('image'), pacienteController.patchPaciente, pacienteModel.pacthPaciente)

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