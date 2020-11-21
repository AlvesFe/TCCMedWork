import React from 'react'
import Axios from 'axios'

const API_URL = "http://localhost:3001"


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
        window.location.reload(true);
    }).catch(err => {
        console.log(err);
    })
}