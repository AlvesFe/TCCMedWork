import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import desativarPaciente from '../api/desativarPaciente';
import FormButton from '../components/FormButton';
import { roxo, vermelho } from '../constants/colors.json'
import { AuthContext } from '../routes/AuthProvider';

export default function Config({ navigation }) {
  const { logout } = useContext(AuthContext);

  function desativarConta() {
    Alert.alert(
      "Tem certeza!?",
      "Você só poderá reativar sua conta atravéz de um funcionário do seu hospital",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Desativar conta", onPress: () => {
          desativarPaciente().then(() => {
            logout();
          })
        }}
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.container}>
        <FormButton
            title='Desativar minha conta'
            modeValue='contained'
            labelStyle={styles.disableAcc} 
            color={vermelho}
            onPress={() => {
              desativarConta();
            }}
        />
        <FormButton
            title='Centro de ajuda'
            modeValue='contained'
            labelStyle={styles.helpCenter} 
            color={roxo}
            onPress={() => {
              navigation.navigate('Centro de Ajuda')
            }}
        />
        <FormButton
            title='Sair'
            modeValue='contained'
            labelStyle={styles.logOut} 
            color={roxo}
            onPress={() => {
              logout();
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOut: {
        fontSize: 18
    },
    helpCenter: {
        fontSize: 18
    },
    disableAcc:{
        fontSize: 16
    }
})