import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'


export default function alterarFarmacia(dados) {

    const token = localStorage.getItem('current_user')
    const data = {
        status: dados.status, 
        id_Compra: dados.id_Compra
    }

    return Axios({
        method: 'PATCH',
        url: "/api/farmacia/alterarStatus",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        return true
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}