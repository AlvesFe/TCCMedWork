import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'


export default function alterarStatus(dados) {

    const token = localStorage.getItem('current_user')
    const data = {
        status: dados.status, 
        id_Compra: dados.id_Compra
    }

    return Axios({
        method: 'PATCH',
        url: "/api/compra/alterarStatus",
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