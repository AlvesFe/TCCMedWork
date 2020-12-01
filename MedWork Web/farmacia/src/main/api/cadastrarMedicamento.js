import React from 'react'
import Axios from 'axios'
import cadastarEstoque from './cadastrarEstoque'
import Event from '../../event/Alerts';


export default function cadastrarMedicamento(dados) {

    const token = localStorage.getItem('current_user')
    const json = localStorage.getItem('user_data');
    const user = JSON.parse(json);

    const data = {
        dt_Validade: dados.validadeMedicamento, 
        tarja: dados.tarjaMedicamento,
        codigo: dados.codigoMedicamento, 
        nome: dados.nomeMedicamento, 
        descricao: dados.descricaoMedicamento, 
        fabricante: dados.fabricanteMedicamento, 
        preco: dados.precoMedicamento
    }

    const dataEstoque = {
        estoque: dados.quantidadeMedicamento, 
        fk_id_Farmacia: user.id_Farmacia, 
        fk_id_Remedio: "",
    }
    return Axios({
        method: 'POST',
        url: "/api/remedio/",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        dataEstoque.fk_id_Remedio = data.id_Remedio;
        return cadastarEstoque(dataEstoque).then(res => {
            return res
        })
    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}