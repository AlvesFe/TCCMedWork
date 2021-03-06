import React from 'react'
import Axios from 'axios'


export default function confirmarToken(dados) {

    dados = {
        token: dados.token
    }

    return Axios({
        method: 'post',
        url: "/api/medico/confirmetoken",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        localStorage.setItem('token_reset', dados.token)
        window.location.assign('#/redefinir-senha')
        return true
    }).catch(err => {
        return false
    })
}