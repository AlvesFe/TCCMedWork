import Axios from 'axios'
import Event from '../../event/Alerts'

export default function getPaciente(dados) {

    const token = localStorage.getItem('current_user')


    const data = {
        cpf: dados.replace(/[^\d]+/g, '')
    }

    return Axios({
        method: 'post',
        url: "/api/paciente/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        data.data[0] ? Event("Dados Encontrados") : Event("Não Encontrado")
        return data.data[0]
    }).catch(err => {
        Event("Não Encontrado")
        console.log(err.response);
        return false
    })
}