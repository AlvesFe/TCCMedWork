import Axios from 'axios'

export default function envairReceita(data) {

    const token = localStorage.getItem('current_user')


    const dataFinal = new FormData();

    for (const key in data) {
        dataFinal.append(key, data[key])
    }


    Axios({
        method: 'post',
        url: "/api/receita/SendPDF",
        data: dataFinal,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/formdata',
            'Authorization': 'bearer ' + token
        }
    }).then(response => {
        const { data } = response;
    }).catch(err => {
    })
}