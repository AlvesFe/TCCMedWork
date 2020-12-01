import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'expo-jwt';

const url = env.API_URL;
const key = env.JWT_KEY;

export default async function desativarPaciente() {

    const token = await AsyncStorage.getItem("userToken").then(res => {
        return res;
    })

    const user = await AsyncStorage.getItem("userData").then(res => {
        return JSON.parse(res);
    })

    Axios({
        method: 'post',
        url: url+"/paciente/desativar",
        data:{
            id_Paciente: user.id_Paciente
        },
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'bearer '+token
        }
        
    }).then(async response => {
        const { data } = response.data;
    }).catch(err => {
    })
}