import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function alterarSenha(dados) {
    const token = localStorage.getItem('token_reset')

    const data = {
        token,
        senha: dados.senha,
        confsenha: dados.confSenha
    }
    console.log(data);
    return Axios({
        method: 'PATCH',
        url: "/api/paciente/resetarsenha",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        window.location.assign('#/login')
        localStorage.removeItem('token_reset')
        return true
    }).catch(err => {
        console.log(err.response.data.error);
        Event(err.response.data.error)
        return false

    })
}