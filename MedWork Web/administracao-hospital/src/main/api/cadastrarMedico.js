import React from 'react'
import Axios from 'axios'
import Event from '../../event/Alerts';

export default function cadastrarMedico(dados) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    const data = {
        image: dados.image,
        crm: dados.crm,
        email: dados.email,
        nome: dados.nomeMedico,
        especialidade: dados.especialidade,
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        celular: dados.celular.replace(/[^\d]+/g, ''),
        dt_Nascimento: dados.dataNascimento.replace(/[^\d]+/g, ''),
        senha: dados.senhaProvisoria,
        tp_sanguineo: dados.tipoSanguineo,
        cpf: dados.cpf.replace(/[^\d]+/g, ''),
        rg: dados.rg.replace(/[^\d]+/g, ''),
        fk_id_Hospital: userData.id_Hospital
    }

    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }

    return Axios({
        method: 'POST',
        url: "/api/medico",
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
        Event(err.response.data.error);
        return false;
    })
}