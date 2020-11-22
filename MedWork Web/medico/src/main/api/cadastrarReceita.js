import React from 'react'
import Axios from 'axios'
import getPaciente from './getPaciente';
import variables from "./variables";

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
        dt_Validade: dados.validade,
        fk_id_Medico: userData.id_Medico,
        Quantidade: dados.quantidade,
        fk_id_Paciente: paciente.id_Paciente,
        fk_id_Receita: "N/A",
        fk_id_Remedio: remedio.id_Remedio
    }
    // const dataFinal = new FormData();

    // for (const key in data) {
    //     dataFinal.append(key, data[key])
    // }
    // console.log(data);

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
            return true;
        }).catch(error => {
            console.log(err.response);
            return false;
        })
    }).catch(err => {
        console.log(err.response);
        return false;
    })
}