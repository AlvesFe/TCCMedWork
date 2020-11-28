import React from 'react'
import Axios from 'axios'
import variables from "./variables";
import Event from '../../event/Alerts';

export default function alterarSenha(dados) {

    const token = localStorage.getItem('current_user')
    const token_reset = localStorage.getItem('token_reset')

    const data = {
        token: token_reset,
        senha: dados.senha,
        confsenha: dados.confSenha
    }

    return Axios ({
        method:'PATCH',
        url:"/api/admMedWork/resetarsenha",
        data,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const {data} = response;
        console.log(data);
        localStorage.removeItem('token_reset')
        window.location.assign('#/login');
        return true;
    }).catch(err => {
        Event(err.response.data.error);
        console.log(err.response.data.error);
        return false;
    })
 }