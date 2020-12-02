import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';


export default function alterarEstoque(data) {
    const token = localStorage.getItem('current_user');

    return Axios({
        method: 'PATCH',
        url: "/api/remedio_farmacia/",
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
        console.log(err.response.data);
        Event(err.response.data.error)
        return false
    })
}