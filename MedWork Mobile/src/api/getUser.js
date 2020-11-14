import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = env.API_URL;
const key = env.JWT_KEY;

export default function getUser(userData, token, setUser) {
    async function fetchUserData() {
        Axios({
            method: 'post',
            url: url+"/paciente/get",
            data:{
                cpf: userData.cpf
            },
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'bearer '+token
            }
        }).then(async response => {
            const { data } = response.data;
            await AsyncStorage.setItem("userData", JSON.stringify(data[0]))
            await AsyncStorage.setItem("userToken", token)
            setUser(data[0])
        }).catch(err => {
            console.log(err);
        })
    }

    return fetchUserData();
}