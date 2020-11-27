import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env


export default function resetarSenha(dados) {

    dados = {
        senha: dados.senha,
        confsenha: dados.confsenha
    }

    Axios({
        method: 'PACTH',
        url: API_URL + "/recepcionista/resetarsenha",
        data: dados,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}