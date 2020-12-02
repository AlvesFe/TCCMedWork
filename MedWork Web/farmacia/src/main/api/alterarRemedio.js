import React from 'react'
import Axios from 'axios'
import alterarEstoque from './alterarEstoque';


export default function alterarRemedio(dados) {
    const token = localStorage.getItem('current_user');

    const data = {
        dt_Validade: dados.validadeMedicamento,
        tarja: dados.tarjaMedicamento,
        nome: dados.nomeMedicamento,
        descricao: dados.descricaoMedicamento,
        fabricante: dados.fabricanteMedicamento,
        preco: dados.precoMedicamento,
        bula: dados.bula,
        id_Remedio: dados.id_Remedio
    }
    const estoque  = {
        estoque: dados.quantidadeMedicamento,
        id_Remedio_Farmacia: dados.id_Remedio_Farmacia
    }
    console.log(typeof data.preco);
    return Axios({
        method: 'PATCH',
        url: "/api/remedio",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        return alterarEstoque(estoque).then(res => {
            return res
        })
    }).catch(err => {
        console.log(err.response.data);
        return false
    })
}