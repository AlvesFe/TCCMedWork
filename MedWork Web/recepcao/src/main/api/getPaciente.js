import Axios from 'axios'
import variables from "./variables";
import Event from '../../event/Alerts'

const env = variables()
const { API_URL } = env

export default function getPaciente(dados) {

    const token = localStorage.getItem('current_user')


    const data = {
        cpf: dados.replace(/[^\d]+/g,'')
    }

    return Axios({
        method: 'post',
        url: API_URL + "/paciente/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data.data[0]);
        data.data[0] ? Event("Dados Encontrados"): Event("Não Encontrado")
        return data.data[0]
    }).catch(err => {
        Event("Não Encontrado")
        console.log(err.response);
        return false
    })
}