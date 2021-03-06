import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function cadastrarRecepcionista(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    const data = {
        image: dados.image,
        nome: dados.nomeRecepcionista,
        dt_Nascimento: dados.dataNascimento.replace(/[^\d]+/g, ''),
        tp_sanguineo: dados.tipoSanguineo,
        endereco: dados.endereco,
        cpf: dados.cpf.replace(/[^\d]+/g, ''),
        senha: dados.senhaProvisoria,
        rg: dados.rg.replace(/[^\d]+/g, ''),
        email: dados.email,
        celular: dados.celular.replace(/[^\d]+/g, ''),
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        fk_id_Hospital: userData.id_Hospital
    }
    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }

    return Axios({
        method: 'POST',
        url: "/api/recepcionista",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        Event(data.mensagem);
        return true;
    }).catch(err => {
        Event(err.response.data.error)
        return false;
    })
}