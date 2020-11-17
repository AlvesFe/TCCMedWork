import env from '../../variables';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const url = env.API_URL;

const toastSuccess = (text) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: text,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40
    })  
  }
  
  const toastFail = (text) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Falha ao atualizar cadastro',
      text2: text,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40
    })  
  }
  

export default function patchUser(user, setViewing, setUser) {

    const dtn = user.dt_Nascimento
    let realDtn = ""
    let userfinal = new FormData()

    if (dtn.length === 24) {
        realDtn = user.dt_Nascimento.slice(0, -14);
        user = {...user, dt_Nascimento: realDtn}
    }

    for (const key in user) {
        if (key === "foto" && user[key] === "default.png") {
            userfinal.append("foto", null)
        }
        else{
            userfinal.append(key, user[key])
        }
        
    }

    console.log(userfinal);
    async function getToken() {
        const token = await AsyncStorage.getItem("userToken").then(res => {
            return res
        })
        return token
    }

    async function sendUserData() {
        const token = await getToken();
        Axios({
            method: 'patch',
            url: url+"/paciente",
            data: userfinal,
            headers: {
                'Content-Type' : 'multipart/formdata',
                'Authorization' : 'bearer '+token
            }
        }).then(async response => {
            await AsyncStorage.setItem("userData", JSON.stringify(user))
            setViewing(true)
            toastSuccess(response.data.mensagem);
        }).catch(async err => {
            const item = await AsyncStorage.getItem("userData").then(res => {
                return JSON.parse(res);
            })

            const phrase = "Campo "+err.response.data.errormes+" vazio!"

            toastFail(phrase)
            setViewing(true)
            setUser(item)
        })
    }

    return sendUserData();
}