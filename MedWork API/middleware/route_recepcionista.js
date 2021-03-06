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

exports.postRecepcionista = (req, res, next) => {
    permission = ['hospital'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);

    if (result === 'next') {
        next();
    }
    else if (result === 'Usuário inválido') {
        return res.status(401).send({ mensagem: result })
    }
}

exports.getRecepcionistas = (req, res, next) => {
    permission = ['hospital', 'paciente', 'farmacia', 'recepcionista'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);

    if (result === 'next') {
        next();
    }
    else if (result === 'Usuário inválido') {
        return res.status(401).send({ mensagem: result })
    }
}

exports.getRecepcionista = (req, res, next) => {
    permission = ['hospital', 'paciente', 'farmacia', 'recepcionista'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);

    if (result === 'next') {
        next();
    }
    else if (result === 'Usuário inválido') {
        return res.status(401).send({ mensagem: result })
    }
}

exports.patchRecepcionista = (req, res, next) => {
    permission = ['hospital', 'recepcionista'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);

    if (result === 'next') {
        next();
    }
    else if (result === 'Usuário inválido') {
        return res.status(401).send({ mensagem: result })
    }
}

exports.deleteRecepcionista = (req, res, next) => {
    permission = ['hospital'];
    decode = Obtertoken(req);

    if (decode === 'Usuário não autenticado') {
        res.status(401).send({ mensagem: decode });
    }

    result = ValidateRoute(permission, decode);

    if (result === 'next') {
        next();
    }
    else if (result === 'Usuário inválido') {
        return res.status(401).send({ mensagem: result })
    }
}