import React from 'react'
import Axios from 'axios'

const API_URL = "http://192.168.15.45:3001"


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
        console.log(response);
    })
}
