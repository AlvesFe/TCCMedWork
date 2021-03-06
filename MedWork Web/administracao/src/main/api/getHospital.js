import Axios from 'axios'
import variables from "./variables";

const env = variables()
const { API_URL } = env

export default function getHospital() {

    const token = localStorage.getItem('current_user')

    return Axios({
        method: 'GET',
        url: "/api/hospital",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
        return data.data
        
    }).catch(err => {
    })
}