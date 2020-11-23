
async function validateCNPJ(value) {
    const resposta = await axios({
        method: 'get',
        url: `http://geradorapp.com/api/v1/cnpj/validate/${value}?token=1a77a5b656040aace894962324363778`
    })
    .then((response) => {
        return response.data.status;
    });

    return resposta == 1 ?  true : false
}

exports.postEstabelecimento = async (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }

    if(!await validateCNPJ(req.body.cnpj)){
        return res.status(500).send({
            error: "errocnpjinvalido"
        })
    }
    next();
}

exports.getEstabelecimento = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    next();
}

exports.deleteEstabelecimento = (req, res, next) => {

    for (let key in req.body) {
        if (!req.body[key]) {
            return res.status(500).send({
                error: "erro" + key + "vazio"
            })
        }
    }
    next();
}