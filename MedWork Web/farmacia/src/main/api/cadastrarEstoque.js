import React from 'react'
import Axios from 'axios'


export default function CadastrarEstoque(data) {

    const token = localStorage.getItem('current_user')
    console.log(data);
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
        console.log(err.response)
        return false
    })
}