import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { roxo } from '../constants/colors.json';
import { Video } from 'expo-av';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Seja bem-vindo à MedWork!</Text>
      <View>
        <Text style={styles.subTitle}>Seja bem-vindo ao nosso aplicativo da MedWork, nele você vai poder consultar suas receitas medicas, alterar seu perfil, e muito mais...</Text>
        <Text style={styles.subTitle}>Confira nosso vídeo:</Text>
      </View>
      <View>
        <View style={styles.videoContainer}>
          <Video
            source={require('../../assets/videoplayback.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            useNativeControls
            isLooping={false}
            style={styles.videoStyle}
          />
          <View>
            <Text style={styles.title}>MedWork - Boas Vindas</Text>
          </View>
        </View>
      </View>

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
    fontWeight: 'bold',
    flexDirection: 'column'
  },
  subTitle: {
    marginTop: 10,
    marginHorizontal: 15,
    textAlign: 'justify'
  },
  videoContainer: {
    flex: 1,
    marginTop: 30,
    width: '98%'
  },
  videoStyle: {
    height: 250,
    width: '100%',
  },
})