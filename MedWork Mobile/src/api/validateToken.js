import env from '../../variables';
import Axios from 'axios';
import  { ToastAndroid } from 'react-native';

const url = env.API_URL;

export default async function validateToken( token, navigation, setCarregando ) {

    Axios({
        method: 'post',
        url: url+"/paciente/confirmetoken",
        data:{
            token
        },
        headers: {
            'Content-Type' : 'application/json'
        }
        
    }).then(async response => {
        ToastAndroid.showWithGravity(
            "Sucesso",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        setCarregando(false)
    }).catch(err => {
        console.log(err.response);
        ToastAndroid.showWithGravity(
            "Token inválido",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        navigation.goBack();
    })
}