/* 
    Este é o arquivo de CRUD (Create, Read, Update, Delete)
    ou no caso PGPD (Post, Get, Patch, Delete) da entidade Receita do projeto MEDWORK,
    Toda manipulação de dados da Receita feitas pelo APP ou Site do projeto 
    passarão por aqui para efetuar alterações no banco de dados.
*/

const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');
//FUNÇÕES GLOBAIS

//Função que verifica se determinado valor está em branco ou só com espaços
function isNullOrWhitespace(field) {
    return !field
}

// Verifica se é um Número
function ValidationNumber(value) {

    if (isNaN(value)) {
        return true;
    }
    return false;
}

const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    })
}

function SendMail(transport, file, data) {
    readHTMLFile(__dirname + '/../src/template/Receita.html', function (err, html) {
        const template = handlebars.compile(html);
        const htmlTosend = template(data);
        transport.sendMail({
            from: "MedWork <Medwork.developer@gmail.com>",
            to: data.email,
            text: '',
            subject: 'Receita',
            html: htmlTosend,
            attachments: [{
                filename: file.filename,
                path: file.path,
                contentType: file.mimetype
              }]
        })
    })
    return true;
}

exports.postReceita = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    next();
}



exports.getReceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidreceitavazio"
        })
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}

exports.patchReceita = (req, res, next) => {

    for (let key in req.body) {
        if (isNullOrWhitespace(req.body[key])) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}

exports.deleteREceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidreceitavazio"
        })
    }

    if (req.body.id_Receita.length !== 60) {
        return res.status(500).send({
            error: "errotamanhoidreceita"
        })
    }
    next();
}

exports.listReceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Paciente)) {
        return res.status(500).send({
            error: "erroidpacientevazio"
        })
    }

    // if (req.body.id_Paciente.length !== 60) {
    //     return res.status(500).send({
    //         error: "errotamanhoidpaciente"
    //     })
    // }
    next();
}

exports.detalhesReceita = (req, res, next) => {

    if (isNullOrWhitespace(req.body.id_Receita)) {
        return res.status(500).send({
            error: "erroidpacientevazio"
        })
    }

    // if (req.body.id_Receita.length !== 60) {
    //     return res.status(500).send({
    //         error: "errotamanhoidreceita"
    //     })
    // }
    next();
}

exports.SendPDF = (req, res, next) => {

    if(req.file.fieldname != "pdf"){
        return res.status(500).send({
            error: "erroarquivoinvalido"
        })
    }

    const transport = nodemailer.createTransport({
        host: process.env.API_NODEMAILER_HOST,
        port: process.env.API_NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.API_NODEMAILER_USER,
            pass: process.env.API_NODEMAILER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const data = {
        nome: req.body.nome,
        email: req.body.email,
    }
    if(SendMail(transport, req.file, data) == true){
        return res.status(200).send({
            success: 1,
            mensagem: "Receita Enviada"
        })
    }

    return res.status(500).send({
        success: 0,
        error: "Falha ao Enviar Receita"
    })
}