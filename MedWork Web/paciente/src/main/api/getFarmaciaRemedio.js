import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'

export default function getFarmaciaRemedio(dados) {
    const token = localStorage.getItem('current_user')
    const data = {
        id_Remedio: dados
    }
    return Axios({
        method: 'post',
        url: "/api/remedio_Farmacia/getfarmaremedios",
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