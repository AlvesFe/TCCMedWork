const jwt = require('jsonwebtoken');

function ValidateRoute(permission, tipo) {
    for (let key in permission) {
        if (permission[key] === tipo.tipo) {
            return 'next';
        }
    }
    return 'Usuário inválido';
}

function Obtertoken(value) {
    try {
        const token = value.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        console.log(decode);
        return decode;

    } catch (error) {
        return 'Usuário não autenticado';
    }
}

exports.postCompra = (req, res, next) => {

    permission = ['paciente'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: 'Usuário não autenticado' });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if ('Usuário inválido'){
        return res.status(401).send({ mensagem: 'Usuário inválido'})
    }

}

exports.getCompras = (req, res, next) => {

    permission = ['recepcionista', 'paciente'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: 'Usuário não autenticado' });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if ('Usuário inválido'){
        return res.status(401).send({ mensagem: 'Usuário inválido'})
    }
}

exports.getCompra = (req, res, next) => {

    permission = ['recepcionista', 'paciente'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: 'Usuário não autenticado' });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if ('Usuário inválido'){
        return res.status(401).send({ mensagem: 'Usuário inválido'})
    }
}

exports.patchCompra = (req, res, next) => {

    permission = ['recepcionista'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: 'Usuário não autenticado' });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if ('Usuário inválido'){
        return res.status(401).send({ mensagem: 'Usuário inválido'})
    }
}

exports.deleteCompra = (req, res, next) => {

    permission = ['recepcionista'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: 'Usuário não autenticado' });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if ('Usuário inválido'){
        return res.status(401).send({ mensagem: 'Usuário inválido'})
    }
}

