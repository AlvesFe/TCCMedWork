import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthContext } from '../routes/AuthProvider';
import { roxo } from '../constants/colors.json';
import env from '../../variables';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Seja bem-vindo à MedWork!</Text>
      <View>
        <Text style={styles.subTitle}>Seja bem-vindo ao nosso aplicativo da MedWork, nele você vai poder consultar suas receitas medicas, alterar seu perfil, e muito mais...</Text>
        <Text style={styles.subTitle}>Confira nosso vídeo:</Text>
      </View>
      <View>
        {/* <Video/> */}
      </View>
      <Text style={styles.title}>MedWork - Boas Vindas</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 29,
    color: roxo,
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold'
  },
  subTitle: {
    marginTop: 10,
    marginHorizontal: 15,
    textAlign: 'justify'
  },
})