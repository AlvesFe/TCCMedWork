import React from 'react'
import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env

export default function patchUser(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    if (dados.senhaProvisoria != dados.confirmarSenha) {
        return { erro: "senhasnaoconferem" }
    }

    const data = {
        nome: dados.nome,
        especialidade: dados.especiealidade,
        telefone: dados.telefone,
        celular: dados.celular,
        dt_Nascimento: dados.dataNascimento,
        ativo: dados.ativo,
        image: dados.image,
        senha: dados.senha,
        tp_sanguineo: dados.tipoSanguineo,
        id_Medico: dados.id_Medico
    }

    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }

    Axios({
        method: 'PATCH',
        url: API_URL + "/medico",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data)
    }).catch(err => {
        console.log(err);
        return false
    })
}