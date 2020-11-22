import Axios from 'axios'
import variables from "./variables";
import jwt_decode from "jwt-decode";

const env = variables()
const { API_URL } = env

export default function getRecepcionista() {

    const token = localStorage.getItem('current_user')
    const decode = jwt_decode(token)

    if (decode.exp * 1000 < Date.now()) {
        localStorage.removeItem('current_user');
        return window.location.reload();
    }

    const data = {
        cpf: decode.cpf
    }

    Axios({
        method: 'post',
        url: API_URL + "/recepcionista/get",
        data,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        const stringData = JSON.stringify(data.data[0])
        localStorage.setItem('user_data', stringData)
        console.log(data);
    }).catch(err => {
        console.log(err.response);
    })
}