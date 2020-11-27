import Axios from 'axios'
import Event from '../../event/Alerts';
import variables from "./variables";

const env = variables()
const { API_URL } = env

export default function getRemedio(dados) {

    const token = localStorage.getItem('current_user')

    const data = {
        codigo: dados
    }
    return Axios({
        method: 'post',
        url: API_URL + "/remedio/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return data.data[0];
    }).catch(err => {
        console.log(err.response.data.error);
        Event(err.response.data.error);
        return false;
    })
}