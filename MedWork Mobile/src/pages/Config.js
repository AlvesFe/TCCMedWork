import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { roxo, vermelho } from '../constants/colors.json'
import { AuthContext } from '../routes/AuthProvider';

export default function Config() {
  return (
    <View style={styles.container}>
        <FormButton
            title='Desativar minha conta'
            modeValue='contained'
            labelStyle={styles.disableAcc} 
            color={vermelho}
            onPress={() => {
              logout();
            }}
        />
        <FormButton
            title='Centro de ajuda'
            modeValue='contained'
            labelStyle={styles.helpCenter} 
            color={roxo}
            onPress={() => {
              logout();
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