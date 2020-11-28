import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const {API_URL} = env


export default function recuperarSenha (dados) {

    dados = {
        email: dados.email
    }

    return Axios ({
        method:'post',
        url:"/api/admMedWork/recuperarsenha",
        data: dados,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const {data} = response;
        window.location.assign('#/confirmar');
        return data.success
    }).catch(err => {
        console.log(err);
    })
}