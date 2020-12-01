import Axios from 'axios'
import Event from '../../event/Alerts';

export default function getInformacoes(cnpj, Estabelecimento) {

    const token = localStorage.getItem('current_user')

    const data = {
        cnpj
    }

    return Axios({
        method: 'POST',
        url: `/api/${Estabelecimento}/get`,
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(res => {
        return res.data.data[0];
    }).catch(error => {
    })
}