import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { verde, roxo, cinza } from '../constants/colors.json';
import { AuthContext } from '../routes/AuthProvider';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
//import login from '../api/login';

import Logo from '../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height} = Dimensions.get('screen');

export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>
          <Image style={styles.image} source={Logo} />
          <Text style={styles.phraseOne}>Seja bem-vindo, paciente!</Text>
          <Text style={styles.phraseTwo}>FAÇA LOGIN PARA ACESSAR SUAS INFORMAÇÕES</Text>
          <FormInput
            labelName='E-mail'
            value={email}
            autoCapitalize='none'
            onChangeText={userEmail => setEmail(userEmail)}
            theme={{colors:{primary: verde}}}
            underlineColor={verde}
          />
          <FormInput
            labelName='Password'
            value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setPassword(userPassword)}
            theme={{colors:{primary: verde}}}
            underlineColor={verde}
          />
          <FormButton
            title='Login'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel} 
            color={roxo}
            onPress={() => {
              login(email, password, setPassword);
            }}
          />
          <TouchableOpacity><Text style={styles.resetPasswordText}>NÃO CONSIGO FAZER LOGIN</Text></TouchableOpacity>
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
    loginButtonLabel: {
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
      fontSize: 28,
      marginBottom: 10
    },
    phraseTwo:{
      fontSize: 16
    }
});