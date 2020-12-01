import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function alterarHospital(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        id_Hospital: dados.id_Hospital,
        nome: dados.nomeEmpresa,
        image: dados.image,
        endereco: dados.endereco,
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        ativo: dados.ativo,
        senha: dados.senha
    }
    let dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key]);
    }
    return Axios({
        method: 'PATCH',
        url: "/api/hospital",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return true;
    }).catch(err => {
        Event(err.response.data.error);
        return false;
    })
}