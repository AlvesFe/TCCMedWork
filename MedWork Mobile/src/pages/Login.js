import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Login from '../api/login';

export default function LoginPage({ navigation }) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return (
        <View style={styles.container}>
          <Title style={styles.titleText}>MEDWORK</Title>
          <FormInput
            labelName='E-mail'
            value={email}
            autoCapitalize='none'
            onChangeText={userEmail => setEmail(userEmail)}
            underlineColor={'#99c13d'}
            selectionColor={'#99c13d'}
          />
          <FormInput
            labelName='Password'
            value={password}
            secureTextEntry={true}
            onChangeText={userPassword => setPassword(userPassword)}
          />
          <FormButton
            title='Login'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => login(email, password)}
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
    }
  });
  