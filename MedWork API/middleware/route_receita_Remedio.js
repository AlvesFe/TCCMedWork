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

exports.postReceitaRemedio= (req, res, next) => {
    permission = ['medico'];
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

exports.getReceitaRemedios = (req, res, next) => {
    permission = ['medico', 'paciente', 'farmacia'];
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

exports.getReceitaRemedio = (req, res, next) => {
    permission = ['medico', 'paciente', 'farmacia'];
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

exports.pathReceitaRemedio = (req, res, next) => {
    permission = ['medico'];
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

exports.deleteReceitaRemedio = (req, res, next) => {
    permission = ['medico'];
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