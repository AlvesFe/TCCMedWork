import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function alterarPaciente(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        dt_Nascimento: dados.dataNascimento,
        nome: dados.nomePaciente,
        image: dados.image,
        telefone: dados.telefone,
        tp_sanguineo: dados.tipoSanguineo,
        alergia: dados.alergia,
        endereco: dados.endereco,
        celular: dados.celular,
        ativo: dados.ativo,
        senha: dados.senha,
        alt_senha: dados.alt_senha,
        cpf: dados.cpf
    }
    console.log(data);
    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }

    return Axios({
        method: 'PATCH',
        url: "/api/paciente/",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        return true
    }).catch(err => {
        console.log(err.response.data.error);
        Event(err.response.data.error)
        return false

    })
}
