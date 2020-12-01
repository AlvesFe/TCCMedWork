import env from '../../variables';
import Axios from 'axios';
import  { ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

const url = env.API_URL;

export default async function AlterarSenha( senha1, senha2, navigation, token ) {

    Axios({
        method: 'patch',
        url: url+"/paciente/resetarsenha",
        data:{
            senha: senha1,
            token,
            confsenha: senha2           
        },
        headers: {
            'Content-Type' : 'application/json'
        }
        
    }).then(async response => {
        ToastAndroid.showWithGravity(
            "Senha atualizada",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
        navigation.navigate('Login')
    }).catch(err => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Falha na troca de senha',
            text2: 'Senhas não conferem',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
        })  
    })
}