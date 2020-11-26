import React from 'react'
import Axios from 'axios'
import variables from "./variables";
import Swal from 'sweetalert2';

const env = variables()
const {API_URL} = env

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true    
}) 

export default function doLogin (dados) {
    Axios ({
        method:'post',
        url:API_URL+"/admMedWork/login",
        data: dados,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        const {data} = response;
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
        console.log(err);
    })
}