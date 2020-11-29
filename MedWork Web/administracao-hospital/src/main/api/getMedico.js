import Axios from 'axios'
import Event from '../../event/Alerts'
import jwt_decode from "jwt-decode";


export default function getMedico(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        crm: dados.crm.replace(/[.-]+/g, '')
    }
    return Axios({
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
        if (data.data[0]) {
            localStorage.setItem('crm', dados.crm);
            window.location.assign('#/alterar-medico');
            Event("Encontrado");
            return data.data[0]
        } else {
            Event("Não Encontrado");
            return false
        }

    }).catch(err => {
        Event(err.response.data.error)
        return false
    })
}