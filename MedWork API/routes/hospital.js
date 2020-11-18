//Importação do Express JS
const express = require('express');

//Uso do método Router do Express para escolher a função desejada
const router = express.Router();

//Chamando a controller da tabela Hospital
const hospitalController = require('../controller/hospital-validation');

//Chamando a model da tabela Hospital
const hospitalModel = require('../model/hospital-model');

//Chamando a Middleware da tabela Hospital
const hospitalMiddleware = require('../middleware/route_hospital');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './uploads/hospital')
    },
    filename: async function(req, file, callback){
        console.log(file.originalname.split('.').pop());
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
}) 

//CREATE (POST) - Recebe o valor externo e envia o pedido de inserção de dados do banco de dados
router.post('/', hospitalMiddleware.postHospital, upload.single('image'), hospitalController.postHospital, hospitalModel.postHospital);

//READ (GET) - Busca e exibe todos os valores existentes da tabela do banco de dados
router.get('/', hospitalMiddleware.getHospitais, hospitalModel.getHospitais);

//READ ESPECIFICO - Busca e exibe um item especifico da tabela do banco de dados
router.post('/get', hospitalMiddleware.getHospital, hospitalController.getHospital, hospitalModel.getHospital);

//UPDATE (PATCH) - Modifica um valor existente da tabela do banco de dados 
router.patch('/', hospitalMiddleware.patchHospital, upload.single('image'), hospitalController.patchHospital, hospitalModel.patchHospital);

//DELETE - Apaga um valor existente da tabela do banco de dados
router.delete('/', hospitalMiddleware.deleteHospital, hospitalController.deleteHospital, hospitalModel.deleteHospital);

//Metodo de Login
router.post('/login', hospitalController.logarHospital, hospitalModel.logarHospital);

router.post('/recuperarsenha', hospitalController.recuperarSenha, hospitalModel.recuperarSenha)

router.post('/confirmetoken', hospitalController.confirmetoken)

router.patch('/resetarsenha', hospitalController.restSenha, hospitalModel.resetsenha)

module.exports = router;