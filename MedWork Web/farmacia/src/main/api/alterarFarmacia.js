import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'


export default function alterarFarmacia(dados) {

    const token = localStorage.getItem('current_user')
    const data = {
        nome: dados.nome,
        taxa: dados.taxa.replace(/[^\d\.\,\s]+/g,""),
        telefone: dados.telefone,
        endereco: dados.endereco,
        detalhes: dados.detalhes,
        ativo: dados.ativo,
        senha: dados.senha,
        image: dados.image,
        id_Farmacia: dados.id_Farmacia,
    }
    return Axios({
        method: 'PATCH',
        url: "/api/farmacia/",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return true
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}