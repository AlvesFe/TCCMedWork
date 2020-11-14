import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Colors from '../constants/colors.json';
import { Title } from 'react-native-paper';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import login from '../api/login';

import Logo from '../assets/logo.png'

const { width, height} = Dimensions.get('screen');

export default function LoginPage({ navigation, setUser }) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return (
        <View style={styles.container}>
          <Image style={styles.image} source={Logo} />
          <FormInput
            labelName='E-mail'
            value={email}
            autoCapitalize='none'
            onChangeText={userEmail => setEmail(userEmail)}
            theme={{colors:{primary: Colors.verde}}}
            underlineColor= {Colors.verde}
          />
          <FormInput
            labelName='Password'
            value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setPassword(userPassword)}
            theme={{colors:{primary: Colors.verde}}}
            underlineColor= {Colors.verde}
          />
          <FormButton
            title='Login'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel} 
            onPress={() => {
              login(email, password, setPassword, setUser);
            }}
          />
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
      fontSize: 22
    },
    navButtonText: {
      fontSize: 16
    },
    image: {
        height: height/4,
        width: height/4
    }
});