import React from 'react'
import Axios from 'axios'

export default function alterarSenha(dados) {
    const token = localStorage.getItem('token_reset')

    dados = {
        token,
        senha: dados.senha,
        confsenha: dados.confSenha
    }
    return Axios({
        method: 'PATCH',
        url: "/api/medico/resetarsenha",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        window.location.assign('#/login')
        localStorage.removeItem('token_reset')
        return true
    }).catch(err => {
        return false

    })
}