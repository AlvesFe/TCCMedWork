import React, { createContext, useState } from 'react';
import { ToastAndroid } from 'react-native';
import env from '../../variables';
import Axios from 'axios';
import Toast from 'react-native-toast-message';
import jwt from 'expo-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = env.API_URL;
const key = env.JWT_KEY;

const toastSuccess = () => {
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
}

const toastFail = () => {
  Toast.show({
    type: 'error',
    position: 'top',
    text1: 'Falha na autenticação',
    text2: 'Usuário ou senha inválidos',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40
  })  
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, senha, setPassword) => {
          Axios({
            method: 'post',
            url: url+"/paciente/login",
            data:{
              email,
              senha
            },
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(async response => {
            toastSuccess();
            await AsyncStorage.setItem("userToken", response.data.token)
            setUser(response.data.token)
          })
          .catch(err => {
            toastFail();
            setPassword('')
          })
        },
        logout: () => {
          try {
            AsyncStorage.removeItem("userData")
            AsyncStorage.removeItem("userToken")
            setUser(null)
            ToastAndroid.showWithGravity(
              "Logout realizado com sucesso!",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            )
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
