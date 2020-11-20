import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');

export default function Retirada({ route, navigation }) {

  const [carregando, setCarregando] = useState(true);
  const { item, detalhes, Quantidade } = route.params


  if (carregando) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Tela de retirada</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  }
})
