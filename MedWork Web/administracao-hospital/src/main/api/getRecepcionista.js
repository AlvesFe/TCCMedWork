import Axios from 'axios'
import Event from '../../event/Alerts'
import jwt_decode from "jwt-decode";


export default function getRecepcionista(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        cpf: dados.cpf.replace(/[^\d]+/g, '')
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
        localStorage.setItem('cpf', dados.cpf.replace(/[^\d]+/g, ''))
        if (data.data[0]) {
            window.location.assign('#/alterar-recepcionista')
            Event("Encontrado");
            return data.data[0];
        } else {
            Event("Não Encontrado");
        }

    }).catch(err => {
        Event(err.response.data.error)
        return err.response.data.error
    })
}