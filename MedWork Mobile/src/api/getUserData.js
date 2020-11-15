import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'expo-jwt';

const url = env.API_URL;
const key = env.JWT_KEY;

export default function getUserData( token, setUserData ) {
    const decode = jwt.decode(token, key, {timeSkew: 30});
    Axios({
        method: 'post',
        url: url+"/paciente/get",
        data:{
            cpf: decode.cpf
        },
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'bearer '+token
        }
    }).then(async response => {
        const { data } = response.data;
        await AsyncStorage.setItem("userData", JSON.stringify(data[0]))
        setUserData(data[0])
    }).catch(err => {
        console.log(err);
    })
}