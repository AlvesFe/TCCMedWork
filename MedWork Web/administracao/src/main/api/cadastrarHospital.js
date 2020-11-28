import React from 'react'
import Axios from 'axios'
import variables from "./variables";
import Event from '../../event/Alerts';

const env = variables()
const {API_URL} = env

export default function cadastrarHospital(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    const data = {
        cnpj: dados.cnpj.replace(/[^\d]+/g,''),
        nome: dados.nomeEmpresa,
        endereco: dados.endereco,
        telefone: dados.telefone.replace(/[^\d]+/g,''),
        email: dados.email,
        senha: dados.senhaProvisoria,
        fk_id_MedWork: userData.id_MedWork
    }

    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }
    
    if(dados.image){
        dataFinal.append("image", dados.image)
    }
    return Axios ({
        method:'POST',
        url:"/api/hospital",
        data: dataFinal,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const {data} = response;
        console.log(data)
        Event(data.mensagem)
        return true
        
    }).catch(err => {
        Event(err.response.data.error);
        console.log(err.response.data.error);
        return false
    })
 }