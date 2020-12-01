import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';


export default function CadastrarEstoque(data) {

    const token = localStorage.getItem('current_user')
    return Axios({
        method: 'POST',
        url: "/api/remedio_Farmacia/",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        return true
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}