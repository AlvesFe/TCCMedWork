import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const {API_URL} = env

export default function cadastrarHospital(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    if (dados.senhaProvisoria !== dados.confirmarSenha) {
        return {erro: "senhasnaoconferem"}
    }

    const data = {
        cnpj: dados.cnpj,
        nome: dados.nomeEmpresa,
        endereco: dados.endereco,
        telefone: dados.telefone,
        email: dados.email,
        senha: dados.senhaProvisoria,
        fk_id_MedWork: userData.id_MedWork
    }

    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }

    return Axios ({
        method:'POST',
        url:API_URL+"/hospital",
        data: dataFinal,
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const {data} = response;
        console.log(data);
        return true
    }).catch(err => {
        console.log(err);
        return false
    })
 }