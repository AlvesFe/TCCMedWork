import React from 'react'
import Axios from 'axios'
import getPaciente from './getPaciente';
import variables from "./variables";
import Event from '../../event/Alerts';

const env = variables()
const { API_URL } = env

export default function cadastrarReceita(dados, paciente, remedio) {

    const token = localStorage.getItem('current_user')
    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)

    if (paciente === false) {
        return { error: "erropacientenaoencontrado" };
    }
    const dataFinal = {
        dosagem: dados.dosagem,
        dt_Emissao: new Date(),
        orientacoes: dados.orientacoes,
        dt_Validade: dados.validade.replace(/[^\d]+/g,''),
        fk_id_Medico: userData.id_Medico,
        Quantidade: dados.quantidade,
        fk_id_Paciente: paciente.id_Paciente,
        fk_id_Receita: "N/A",
        fk_id_Remedio: remedio.id_Remedio
    }

    return Axios({
        method: 'POST',
        url: API_URL + "/receita",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        dataFinal.fk_id_Receita = data.id_Receita;
        return Axios({
            method: 'POST',
            url: API_URL + "/receita_Remedio",
            data: dataFinal,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            }
        }).then(res => {
            Event(res.data.mensagem)
            console.log(res.data);
            return true;
        }).catch(error => {
            Event(error.response.data.error)
            console.log("ERROR1", error.response.data.error);
            return false;
        })
    }).catch(err => {
        Event(err.response.data.error)
        console.log("ERROR2", err.response.data.error);
        return false;
    })
}