import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env


export default function recuperarSenha(dados) {

    dados = {
        email: dados.email
    }

    return Axios({
        method: 'post',
        url: API_URL + "/medico/recuperarsenha",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        return true
    }).catch(err => {
        return false
    })
}