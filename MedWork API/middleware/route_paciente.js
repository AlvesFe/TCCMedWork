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

exports.postPaciente = (req, res, next) => {
    permission = ['recepcionista'];
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

exports.getPacientes = (req, res, next) => {
    permission = ['recepcionista', 'paciente', 'farmacia'];
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

exports.getPaciente = (req, res, next) => {
    permission = ['recepcionista', 'paciente', 'farmacia'];
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

exports.patchPaciente = (req, res, next) => {
    permission = ['recepcionista', 'paciente'];
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

exports.deletePaciente = (req, res, next) => {
    permission = ['recepcionista', 'paciente'];
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