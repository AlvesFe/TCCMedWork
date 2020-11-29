import Axios from 'axios'
import Event from '../../event/Alerts'


export default function alterarMedico(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        image: dados.image,
        nome: dados.nomeMedico,
        especialidade: dados.especialidade,
        telefone: dados.telefone.replace(/[^\d]+/g, ''),
        celular: dados.celular.replace(/[^\d]+/g, ''),
        dt_Nascimento: dados.dataNascimento,
        ativo: dados.status,
        senha: dados.senha,
        tp_sanguineo: dados.tipoSanguineo,
        id_Medico: dados.id_Medico
    }
    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }
    return Axios({
        method: 'PATCH',
        url: "/api/medico/",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return true;
        // data.data[0] ? Event("Encontrado") : Event("Não Encontrado")
    }).catch(err => {
        Event(err.response.data.error)
        return false;
    })
}