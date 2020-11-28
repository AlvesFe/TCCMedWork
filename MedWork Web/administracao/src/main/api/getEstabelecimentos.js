import Axios from 'axios'
import Event from '../../event/Alerts';
import variables from "./variables";

const env = variables()
const { API_URL } = env

export default function getEstabelecimentos(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        cnpj: dados.replace(/[^\d]+/g,'')
    }


    const PegarInformacoes = (Estabelecimento) => {
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
            console.log(error.response);
        })
    }

    return Axios({
        method: 'post',
        url: API_URL + "/estabelecimentos/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        console.log(data);
        return PegarInformacoes(data.data[0].Estabelecimento).then(dados => {
            Event("Dados Encontrados");
            return dados
        });
        
    }).catch(err => {
        console.log(err.response);
    })
}