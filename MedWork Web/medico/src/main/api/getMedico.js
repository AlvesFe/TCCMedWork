import Axios from 'axios'
import jwt_decode from "jwt-decode";

export default function getHospital() {

    const token = localStorage.getItem('current_user')
    const decode = jwt_decode(token)

    if (decode.exp * 1000 < Date.now()) {
        localStorage.removeItem('current_user');
        return window.location.reload();
    }

    const data = {
        crm: decode.crm
    }

    Axios({
        method: 'post',
        url: "/api/medico/get",
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
    }).catch(err => {
    })
}