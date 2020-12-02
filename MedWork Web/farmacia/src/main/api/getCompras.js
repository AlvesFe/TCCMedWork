import React from 'react'
import Axios from 'axios'


export default function getCompra(dados) {

    const token = localStorage.getItem('current_user')
    const json = localStorage.getItem('user_data');
    const user = JSON.parse(json);
    const data = {
        status: dados,
        id_Farmacia: user.id_Farmacia
    }

    return Axios({
        method: 'post',
        url: "/api/compra/getCompra",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return data.Compras
    }).catch(err => {
        console.log(err.response.data);
        return false
    })
}