import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';


export default function getRemedio(dados) {

    const token = localStorage.getItem('current_user')
    const json = localStorage.getItem('user_data');
    const user = JSON.parse(json);
    const data = {
        codigo: dados.codigo,
        id_Farmacia: user.id_Farmacia
    }

    return Axios({
        method: 'post',
        url: "/api/remedio_Farmacia/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        data.data[0] ? Event("success"):Event("erronaoencontrado")
        return data.data
    }).catch(err => {
        return false
    })
}