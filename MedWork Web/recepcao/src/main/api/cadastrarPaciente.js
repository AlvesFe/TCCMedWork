import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function cadastrarPaciente(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    const data = {
        image: dados.image,
        dt_Nascimento: dados.dataNascimento.replace(/[^\d]+/g, ''),
        nome: dados.nomePaciente,
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        tp_sanguineo: dados.tipoSanguineo,
        alergia: dados.alergia,
        rg: dados.rg.replace(/[^\d]+/g, ''),
        email: dados.email,
        cpf: dados.cpf.replace(/[^\d]+/g, ''),
        endereco: dados.endereco,
        celular: dados.celular.replace(/[^\d]+/g, ''),
        senha: dados.senhaProvisoria,
        fk_id_Recepcionista: userData.id_Recepcionista
    }
    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }
    return Axios({
        method: 'POST',
        url: "/api/paciente",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        Event(data.mensagem);
        return true;
    }).catch(err => {
        Event(err.response.data.error)
        return false;
    })
}