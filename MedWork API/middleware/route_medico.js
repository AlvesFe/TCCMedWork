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

exports.postMedico = (req, res, next) => {
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

exports.getMedicos = (req, res, next) => {
    permission = ['paciente', 'farmacia', 'hospital', 'recepcionista', 'medico'];
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

exports.getMedico = (req, res, next) => {
    permission = ['paciente', 'farmacia', 'hospital', 'recepcionista', 'medico'];
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

exports.patchMedico = (req, res, next) => {
    permission = ['hospital', 'medico'];
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

exports.deleteMedico = (req, res, next) => {
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