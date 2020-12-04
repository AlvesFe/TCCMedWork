import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'

export default function getDetalhesReceita(dados) {
    const token = localStorage.getItem('current_user')
    const data = {
        id_Receita: dados
    }
    return Axios({
        method: 'post',
        url: "/api/receita/detalhesreceita",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return data
    }).catch(err => {
        return false
    })
}