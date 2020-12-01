import React from 'react'
import Axios from 'axios'
import variables from "./variables";
import Event from '../../event/Alerts';

const env = variables()
const {API_URL} = env

export default function confirmarToken(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        token: dados.token
    }

    return Axios ({
        method:'POST',
        url:"/api/admMedWork/confirmetoken",
        data,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const {data} = response;
        localStorage.setItem('token_reset', dados.token)
        window.location.assign('#/redefinir-senha');
        return true;
    }).catch(err => {
        Event(err.response.data.error);
        return false;
    })
 }