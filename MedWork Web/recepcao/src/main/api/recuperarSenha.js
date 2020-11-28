import React from 'react'
import Axios from 'axios'


export default function recuperarSenha(dados) {

    dados = {
        email: dados.email
    }

    return Axios({
        method: 'post',
        url: "/api/recepcionista/recuperarsenha",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        window.location.assign('#/confirmar')
        return true
    }).catch(err => {
        return false
    })
}