import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env


export default function alterarSenha(dados) {
    const token = localStorage.getItem('token_reset')

    dados = {
        token,
        senha: dados.senha,
        confsenha: dados.confSenha
    }
    console.log(dados)
    return Axios({
        method: 'PATCH',
        url: API_URL + "/medico/resetarsenha",
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
        console.log(data);
    }).catch(err => {
        console.log(err.response);
        return false

    })
}