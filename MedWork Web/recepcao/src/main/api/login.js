import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const {API_URL} = env


export default function doLogin (dados) {

    const data = {
        email: dados.identificacao,
        senha: dados.senha
    }

    Axios ({
        method:'post',
        url:API_URL+"/recepcionista/login",
        data,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const {data} = response;
        localStorage.setItem('current_user', data.token)
        window.location.reload();
    }).catch(err => {
        console.log(err);
    })
}