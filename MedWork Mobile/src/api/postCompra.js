import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

const url = env.API_URL;
const key = env.JWT_KEY;

export default async function postCompra( item, detalhes, Quantidade, tipo, setCarregando, navigation, valor = 0 ) {
    const token = await AsyncStorage.getItem("userToken").then(res => {
        return res;
    })

    const user = await AsyncStorage.getItem("userData").then(res => {
        return JSON.parse(res);
    })

    const valorFinal = Quantidade*item.preco+item.taxa
    const troco = valor - valorFinal


    if (tipo === 'Retirada') {
        Axios({
            method: 'post',
            url: url + "/compra",
            data:{
                quantidade: Quantidade,
                fk_id_Farmacia: item.id_Farmacia,
                fk_id_Remedio: detalhes.id_Remedio,
                fk_id_Paciente: user.id_Paciente,
                valorRecebido: 0.00,
                valorDevolvido: 0.00,
                endereco: 'n/a',
                tipo
            },
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'bearer '+ token
            }
            
        }).then(() => {
            setCarregando(false)
        }).catch((err) => {
            navigation.goBack();
            ToastAndroid.showWithGravity(
                "Houve algum erro, tente novamente mais tarde",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        })
    }
    else if(tipo === "Entrega"){
        Axios({
            method: 'post',
            url: url + "/compra",
            data:{
                quantidade: Quantidade,
                fk_id_Farmacia: item.id_Farmacia,
                fk_id_Remedio: detalhes.id_Remedio,
                fk_id_Paciente: user.id_Paciente,
                valorRecebido: valor,
                valorDevolvido: troco,
                endereco: user.endereco,
                tipo
            },
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'bearer '+ token
            }
            
        }).then(() => {
            setCarregando(false)
        }).catch((err) => {
            navigation.goBack();
            ToastAndroid.showWithGravity(
                "Houve algum erro, tente novamente mais tarde",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        })
    }

    
}


() => {






}