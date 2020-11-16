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
        return decode;

    } catch (error) {
        return 'Usuário não autenticado';
    }
}

exports.postHospital = (req, res, next) => {

    permission = ['admMedWork'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if (result === 'Usuário inválido'){
        return res.status(401).send({ mensagem: result})
    }
}

exports.getHospitais = (req, res, next) => {

    permission = ['admMedWork', 'paciente', 'farmacia', 'hospital'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if (result === 'Usuário inválido'){
        return res.status(401).send({ mensagem: result})
    }
}

exports.getHospital = (req, res, next) => {

    permission = ['admMedWork', 'paciente', 'farmacia', 'hospital'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if (result === 'Usuário inválido'){
        return res.status(401).send({ mensagem: result})
    }
}

exports.patchHospital = (req, res, next) => {

    permission = ['admMedWork', 'hospital'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if (result === 'Usuário inválido'){
        return res.status(401).send({ mensagem: result})
    }
}
exports.deleteHospital = (req, res, next) => {

    permission = ['admMedWork'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);
    
    if  (result === 'next'){
        next();
    }
    else if (result === 'Usuário inválido'){
        return res.status(401).send({ mensagem: result})
    }
}