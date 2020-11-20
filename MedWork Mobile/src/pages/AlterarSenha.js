import React, { useState, useEffect } from 'react';
import { roxo, cinza, verde } from '../constants/colors.json'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Logo from '../assets/logo.png'

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Loading from '../components/Loading';
import validateToken from '../api/validateToken';
import AlterarSenha from '../api/patchAlterarSenha';


const { height, width } = Dimensions.get('screen');

export default function ValidarTokenPage({route, navigation}) {
    const [carregando,setCarregando] = useState(true);
    const [senha, setSenha] = useState('');
    const [confSenha, setconfSenha] = useState('');
    const {token} = route.params

    useEffect(() =>{
        validateToken(token, navigation, setCarregando)
    },[])


    if (carregando) {
        return <Loading/>
    }
    
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.image} source={Logo} />
                <Text style={styles.phraseOne}>Insira uma senha que seja facíl de Lembrar! Em Seguida Realize o seu Login</Text>
                <FormInput
                    labelName='Senha'
                    secureTextEntry={true}
                    value={senha}
                    autoCapitalize='none'
                    onChangeText={senhaValue => setSenha(senhaValue)}
                    theme={{ colors: { primary: verde } }}
                    underlineColor={verde}
                />
                <FormInput
                    labelName='Confirmar Senha'
                    secureTextEntry={true}
                    value={confSenha}
                    autoCapitalize='none'
                    onChangeText={confSenhaValue => setconfSenha(confSenhaValue)}
                    theme={{ colors: { primary: verde } }}
                    underlineColor={verde}
                />
                <FormButton
                    title='ALTERAR'
                    modeValue='contained'
                    labelStyle={styles.buttonLabel}
                    color={roxo}
                    onPress={()=>{
                        AlterarSenha(senha, confSenha, navigation, token)
                    }}
                />
                <Text style={styles.copyrightText}>© 2020 MedWork</Text>
            </View>
        </>
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
        height: height / 3,
        width: width / 1
    },
    resetPasswordText: {
        marginTop: 25,
        textDecorationLine: 'underline',
        color: roxo,
        fontSize: 16,
        fontWeight: 'bold'
    },
    copyrightText: {
        marginTop: 35,
        color: cinza,
        fontSize: 16,
        fontWeight: 'bold'
    },
    phraseOne: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center"
    }
});