import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = env.API_URL;
const key = env.JWT_KEY;

export default async function postCompra( dados ) {
    const token = await AsyncStorage.getItem("userToken").then(res => {
        return res;
    })

    const user = await AsyncStorage.getItem("userData").then(res => {
        return JSON.parse(res);
    })

    Axios({
        method: 'post',
        url: url+"/compra",
        data:{
            quantidade: '',
            fk_id_Farmacia: '',
            fk_id_Remedio: '',
            fk_id_PAciente: ''
        },
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'bearer '+ token
        }
        
    }).then(async response => {
        const { data } = response.data;
    }).catch(err => {
        console.log(err);
    })
}