import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'

export default function cadastrarCompra(data) {
    const token = localStorage.getItem('current_user')

    return Axios({
        method: 'post',
        url: "/api/compra",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        Event("Compra Realizada")
        return true
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}