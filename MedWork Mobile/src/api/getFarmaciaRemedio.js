import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'expo-jwt';

const url = env.API_URL;
const key = env.JWT_KEY;

export default async function getFarmaciaRemedio( remedio, setFarmaciaRem ) {

    const token = await AsyncStorage.getItem("userToken").then(res => {
        return res;
    })

    Axios({
        method: 'post',
        url: url+"/remedio_Farmacia/getfarmaremedios",
        data:{
            id_Remedio: remedio
        },
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'bearer '+token
        }
        
    }).then(async response => {
        const { data } = response.data;
        setFarmaciaRem(data)
    }).catch(err => {
    })
}