import Axios from 'axios'
import Event from '../../event/Alerts'
import jwt_decode from "jwt-decode";


export default function getAllRecepcionista(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        cpf: dados.cpf
    }

    return Axios({
        method: 'POST',
        url: "/api/recepcionista/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        data.data[0] ? Event("Encontrado") : Event("Não Encontrado")
        return data.data[0];
    }).catch(err => {
        Event(err.response.data.error)
    })
}