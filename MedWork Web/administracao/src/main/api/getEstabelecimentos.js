import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env

export default function getEstabelecimentos(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        cnpj: dados
    }


    const PegarInformacoes = (Estabelecimento) => {
         return Axios({
            method: 'POST',
            url: API_URL + `/${Estabelecimento}/get`,
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
        console.log(data.data[0]);
        return PegarInformacoes(data.data[0].Estabelecimento).then(dados => {
            return dados
        });
        
    }).catch(err => {
        console.log(err.response);
    })
}