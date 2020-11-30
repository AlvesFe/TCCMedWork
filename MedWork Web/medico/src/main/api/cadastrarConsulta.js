import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function cadastrarConsulta(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)
        // console.log(dados);
    return Axios({
        method: 'POST',
        url: "/api/consulta",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
    }).catch(err => {
        Event(err.response.data.error)
        console.log("ERROR2", err.response);
        return false;
    })
}