import Axios from 'axios'
import Event from '../../event/Alerts'
import jwt_decode from "jwt-decode";


export default function getAllMedicos() {

    const token = localStorage.getItem('current_user')

    return Axios({
        method: 'GET',
        url: "/api/medico",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        data.data[0] ? Event("Encontrado") : Event("Não Encontrado")
        return data
    }).catch(err => {
        Event(err.response.data.error)
    })
}