import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env


export default function confirmeToken(dados) {

    dados = {
        token: dados.token
    }

    Axios({
        method: 'post',
        url: API_URL + "/hospital/confirmetoken",
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