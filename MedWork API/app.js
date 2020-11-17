//Importando express e morgan
const express = require('express');
const morgan = require('morgan');

//Salvando o metodo express na constante Morgan
const app = express();

//Importando rotas
const rotaAdmMedWork = require('./routes/admMedWork')
const rotaHospital = require('./routes/hospital')
const rotaFarmacia = require('./routes/farmacia')
const rotaRecepcionsita = require('./routes/recepcionista')
const rotaMedico = require('./routes/medico')
const rotaPaciente = require('./routes/paciente')
const rotaRemedio = require('./routes/remedio')
const rotaReceita = require('./routes/receita')
const rotaConsulta = require('./routes/consulta')
const rotaCompra = require('./routes/compra')
const rotaRemedio_Farmacia = require('./routes/remedio_Farmacia')
const rotaReceita_Remedio = require('./routes/receita_Remedio')
const rotaHstReceita = require('./routes/hist_Receita')
const rotaHstReceitaRemedio = require('./routes/hist_Receita_Remedio')
const rotaHstRemedio = require('./routes/hist_Remedio')
const rotaHstConsulta = require('./routes/hist_Consulta')
const rotaHstHospital = require('./routes/Hist_Hospital')
const rotaHstFarmacia = require('./routes/hist_Farmacia')

//Utilizando morgan para exibir as respostas do servidor
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))

//Utilizando o express para usar o body das requisições (JSON)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Chamando o CRUD da rota de ADMs da MedWork
app.use('/admMedWork', rotaAdmMedWork)

//Chamando o CRUD da rota Hospital
app.use('/hospital', rotaHospital)

//Chamando o CRUD da rota Farmacia
app.use('/farmacia', rotaFarmacia)

//Chamando o CRUD da rota Recepcionista
app.use('/recepcionista', rotaRecepcionsita)

//Chamando o CRUD da rota Medico
app.use('/medico', rotaMedico)

//Chamando o CRUD da rota Paciente
app.use('/paciente', rotaPaciente)

//Chamando o CRUD da rota Remedio
app.use('/remedio', rotaRemedio)

//Chamando o CRUD da rota Receita
app.use('/receita', rotaReceita)

//Chamando o CRUD da rota ReceitaRemedio
app.use('/consulta', rotaConsulta)

//Chamando o CRUD da rota Compra
app.use('/compra', rotaCompra)

//Chamando o CRUD da rota Compra
app.use('/receita_Remedio', rotaReceita_Remedio)

//Chamando o CRUD da rota Remedio_Farmacia
app.use('/remedio_Farmacia', rotaRemedio_Farmacia)

//Chamando o CRUD da rota Hist_ReceitaRemedio
app.use('/hst/receita', rotaHstReceita)

//Chamando o CRUD da rota Hist_ReceitaRemedio
app.use('/hst/receitaRemedio', rotaHstReceitaRemedio)

//Chamando o CRUD da rota Hist_Remedio
app.use('/hst/remedio', rotaHstRemedio)

//Chamando o CRUD da rota Hist_Consulta
app.use('/hst/consulta', rotaHstConsulta)

//Chamando o CRUD da rota Hist_Hospital
app.use('/hst/hospital', rotaHstHospital)

//Chamando o CRUD da rota Hist_Hospital
app.use('/hst/farmacia', rotaHstFarmacia)

//Configurando o CORS para uso externo
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(OK).send({})
    }

    next()
})

//ERRO DE ROTA - Rota especificada não encontrada
app.use((req, res, next) => {
    const erro = new Error('Não Encontrado')
    erro.status = 404;
    next(erro)
})

//Envia a Mensagem de erro como um JSON
app.use((error, req, res, next) => {
    res.status(error.status || 500)

    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;