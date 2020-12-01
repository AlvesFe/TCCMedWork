import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'expo-jwt';

const url = env.API_URL;
const key = env.JWT_KEY;

export default async function getReceitas( setReceitas ) {
    const token = await AsyncStorage.getItem("userToken").then(res => {
        return res;
    })

    const decode = jwt.decode(token, key, {timeSkew: 30});

    Axios({
        method: 'post',
        url: url+"/receita/listreceitas",
        data:{
            id_Paciente: decode.id_Paciente
        },
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'bearer '+token
        }
        
    }).then(async response => {
        const { data } = response.data;
        setReceitas(data)
    }).catch(err => {
    })
}