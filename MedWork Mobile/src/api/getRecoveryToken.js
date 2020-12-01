import env from '../../variables';
import Axios from 'axios';
import  { ToastAndroid } from 'react-native';

const url = env.API_URL;

export default async function getRecoveryToken( email, navigation, setCarregando ) {

    Axios({
        method: 'post',
        url: url+"/paciente/recuperarsenha",
        data:{
            email
        },
        headers: {
            'Content-Type' : 'application/json'
        }
        
    }).then(async response => {
        const { data } = response;
        ToastAndroid.showWithGravity(
            "E-mail enviado com sucesso!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        setCarregando(false)
        
    }).catch(err => {
        ToastAndroid.showWithGravity(
            "Email não encontrado!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        navigation.goBack();
    })
    
}