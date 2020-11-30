import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';


export default function alterarRecepcionista(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        nome: dados.nomeRecepcionista,
        dt_nascimento: dados.dataNascimento,
        tp_sanguineo: dados.tipoSanguineo,
        ativo: dados.ativo,
        endereco: dados.endereco,
        senha: dados.senha,
        celular: dados.celular.replace(/[^\d]+/g, ''),
        image: dados.image,
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        id_Recepcionista: dados.id_Recepcionista,
    }
    const dataFinal = new FormData();
    console.log(data)
    for (const key in data) {
        dataFinal.append(key, data[key])
    }
    return Axios({
        method: 'PATCH',
        url: "/api/recepcionista/",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        return true
    }).catch(err => {
        Event(err.response.data.error);
        console.log(err.response.data.error);
        return false
    })
}