import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function desativarPaciente(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        id_Paciente: dados
    }

    Axios({
        method: 'POST',
        url: "/api/paciente/desativar",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        localStorage.removeItem('current_user');
        localStorage.removeItem('user_data');
        window.location.reload();
    }).catch(err => {
    })
}
