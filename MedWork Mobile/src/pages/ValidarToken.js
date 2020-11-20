import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { verde, roxo, cinza } from '../constants/colors.json';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Loading from '../components/Loading';

import Logo from '../assets/logo.png'
import getRecoveryToken from '../api/getRecoveryToken';

const { width, height} = Dimensions.get('screen');

export default function RecuperarSenhaPage({route, navigation}) {
    const [token,setToken] = useState('');
    const [carregando,setCarregando] = useState(true);
    const {email} = route.params;

    useEffect(() =>{
      getRecoveryToken(email, navigation, setCarregando)
    },[])

    if (carregando) {
      return <Loading />
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Logo} />
            <Text style={styles.phraseOne}>Insira seu e-mail para que possamos enviar um link de redefinição de senha.</Text>
            <FormInput
                labelName='Token'
                value={token}
                autoCapitalize='none'
                onChangeText={tokenValue => setToken(tokenValue)}
                theme={{colors:{primary: verde}}}
                underlineColor={verde}
            />
            <FormButton
                title='Confirmar Token'
                modeValue='contained'
                labelStyle={styles.buttonLabel} 
                color={roxo}
                onPress={() => {
                  navigation.navigate('Alterar Senha', {token});
                }}
            />
            <Text style={styles.copyrightText}>© 2020 MedWork</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10
    },
    buttonLabel: {
      fontSize: 18
    },
    navButtonText: {
      fontSize: 16
    },
    image: {
      height: height/3,
      width: width/1
    },
    resetPasswordText:{
      marginTop: 25,
      textDecorationLine: 'underline',
      color: roxo,
      fontSize: 16,
      fontWeight: 'bold'
    },
    copyrightText:{
      marginTop: 35,
      color: cinza,
      fontSize: 16,
      fontWeight: 'bold'
    },
    phraseOne:{
      fontSize: 18,
      marginBottom: 10,
      textAlign: "center"
    }
});