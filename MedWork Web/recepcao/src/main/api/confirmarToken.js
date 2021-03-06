import React from 'react'
import Axios from 'axios'

export default function confirmarToken(dados) {

    dados = {
        token: dados.token
    }

    return Axios({
        method: 'post',
        url: "/api/recepcionista/confirmetoken",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        window.location.assign('#/redefinir-senha');
        localStorage.setItem('token_reset', dados.token)
        return true;
    }).catch(err => {
        return false;
    })
}