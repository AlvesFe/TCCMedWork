import React, { useState } from 'react';
import { roxo, cinza, verde } from '../constants/colors.json'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Logo from '../assets/logo.png'

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


const { height, width } = Dimensions.get('screen');

export default function ValidarTokenPage({route, navigation}) {
    const [senha, setSenha] = useState('');
    const [confSesnha, setconfSesnha] = useState('');
    const {token} = route.params
    console.log(token);
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.image} source={Logo} />
                <Text style={styles.phraseOne}>Insira uma senha que seja facíl de Lembrar! Em Seguida Realize o seu Login</Text>
                <FormInput
                    labelName='Senha'
                    value={senha}
                    autoCapitalize='none'
                    onChangeText={senhaValue => setSenha(senhaValue)}
                    theme={{ colors: { primary: verde } }}
                    underlineColor={verde}
                />
                <FormInput
                    labelName='Confirmar Senha'
                    value={confSesnha}
                    autoCapitalize='none'
                    onChangeText={confSenhaValue => setconfSesnha(confSenhaValue)}
                    theme={{ colors: { primary: verde } }}
                    underlineColor={verde}
                />
                <FormButton
                    title='PROXIMO'
                    modeValue='contained'
                    labelStyle={styles.buttonLabel}
                    color={roxo}
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