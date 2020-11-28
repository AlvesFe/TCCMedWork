import Axios from 'axios'

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
        !data.data[0] ? Event("Informe o CPF") : null
        return data.data[0];
    }).catch(err => {
        console.log(err.response);
        return false;
    })
}