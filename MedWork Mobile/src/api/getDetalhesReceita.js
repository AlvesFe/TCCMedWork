import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'expo-jwt';

const url = env.API_URL;
const key = env.JWT_KEY;

export default async function getUserData( receita, setDetalhes ) {

    const token = await AsyncStorage.getItem("userToken").then(res => {
        return res;
    })

    Axios({
        method: 'post',
        url: url+"/receita/detalhesreceita",
        data:{
            id_Receita: receita.id_Receita
        },
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'bearer '+token
        }
        
    }).then(async response => {
        const { data } = response.data;
        setDetalhes(data[0])
    }).catch(err => {
        console.log(err);
    })
}