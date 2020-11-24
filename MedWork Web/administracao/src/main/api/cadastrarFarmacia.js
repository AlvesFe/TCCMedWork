import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const {API_URL} = env

export default function cadastrarFarmacia(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    const data = {
        nome: dados.nomeEmpresa, 
        telefone: dados.telefone.replace(/[^\d]+/g,''), 
        endereco: dados.endereco, 
        detalhes: dados.detalhes, 
        cnpj: dados.cnpj.replace(/[^\d]+/g,''), 
        senha: dados.senhaProvisoria, 
        taxa: dados.taxa, 
        email: dados.email, 
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
        url:API_URL+"/farmacia",
        data: dataFinal,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const {data} = response;
        console.log(data);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    })
 }