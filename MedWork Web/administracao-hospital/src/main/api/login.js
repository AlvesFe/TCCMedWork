import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})


export default function doLogin(dados) {

    const data = {
        email: dados.identificacao,
        senha: dados.senha
    }

    Axios({
        method: 'post',
        url: "/api/hospital/login",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const { data } = response;
        localStorage.setItem('current_user', data.token)
        Toast.fire({
            icon: 'success',
            title: 'Logado com sucesso'
        }).then(() => {
            window.location.reload();
        })
    }).catch(err => {
        Toast.fire({
            icon: 'error',
            title: 'Falha no login'
        })
    })
}