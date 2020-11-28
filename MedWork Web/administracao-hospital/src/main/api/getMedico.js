import Axios from 'axios'
import Event from '../../event/Alerts'
import jwt_decode from "jwt-decode";


export default function getMedico(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        crm: dados.crm
    }

    Axios({
        method: 'POST',
        url: "/api/medico/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        data.data[0] ? Event("Encontrado") : Event("Não Encontrado")
        console.log(data.data[0]);
        return data.data[0];
    }).catch(err => {
        Event(err.response.data.error)
    })
}