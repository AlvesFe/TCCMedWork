import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts'

export default function confirmarToken(dados) {

    dados = {
        token: dados.token
    }

    return Axios({
        method: 'post',
        url: "/api/paciente/confirmetoken",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        localStorage.setItem('token_reset', dados.token)
        window.location.assign('#/redefinir-senha')
        Event(data.success)
        return true
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}