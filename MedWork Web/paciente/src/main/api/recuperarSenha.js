import React from 'react'
import Event from '../../event/Alerts'
import Axios from 'axios'

export default function recuperarSenha(dados) {

    const data = {
        email: dados.email
    }

    return Axios({
        method: 'post',
        url: "/api/paciente/recuperarsenha",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        window.location.assign('#/confirmar')
        Event(data.success)
        return true
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}