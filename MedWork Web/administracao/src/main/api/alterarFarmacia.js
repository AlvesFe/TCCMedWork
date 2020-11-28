import React from 'react'
import Axios from 'axios'
import variables from "./variables";
import Event from '../../event/Alerts';

export default function alterarFarmacia(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        id_Farmacia: dados.id_Farmacia,
        nome: dados.nomeEmpresa,
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        endereco: dados.endereco,
        detalhes: dados.detalhes,
        ativo: dados.ativo,
        senha: dados.senha,
        image: dados.image,
    }
    const dataFinal = new FormData();
    for (const key in data) {
        dataFinal.append(key, data[key])
    }

    console.log(data);
    return Axios({
        method: 'PATCH',
        url: "/api/farmacia",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        return true;
    }).catch(err => {
        console.log(err.response.data.error);
        return false;
    })
}