const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        console.log(decode)
        if (decode.tipo === 'admMedWork') {
            next()
        }
        else 
        {
            return res.status(401).send({ mensagem: 'Usuário inválido'})
        }
    } catch (error) {
        return res.status(401).send({ mensagem: 'Usuário não autenticado'})
    }
}