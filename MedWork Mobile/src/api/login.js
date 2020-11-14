import env from '../../variables';
import Axios from 'axios';
import { ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

const url = env.apiUrl;

export default function login(email, senha, setPassword, setUser) {
    

    async function doLogin() {
        const response = await Axios({
            method: 'post',
            url: url+"/paciente/login",
            data:{
                email,
                senha
            },
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Login realizado com sucesso',
                text2: 'Seja bem vindo!',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
            setUser(response.data.token)
        }).catch(err => {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Falha no login',
                text2: 'Usuario ou senha invalidos!',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            })
            setPassword('')
        })
    }

    return doLogin()
}