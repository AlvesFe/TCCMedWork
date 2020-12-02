import React from 'react'
import Axios from 'axios'


export default function deletarRemedio(dados) {
    const token = localStorage.getItem('current_user');
    const data = {
        id_Remedio_Farmacia: dados.id_Remedio_Farmacia
    }
    console.log(data);
    return Axios({
        method: 'DELETE',
        url: "/api/remedio_farmacia/",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        window.location.assign('#/todos-os-medicamentos')
        return true
    }).catch(err => {
        console.log(err.response.data);
        return false
    })
}