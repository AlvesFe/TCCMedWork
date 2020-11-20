import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Loading from '../components/Loading';
import env from '../../variables';

const { width, height } = Dimensions.get('window');

export default function Retirada({ route, navigation }) {

  const [carregando, setCarregando] = useState(true);
  const { item, detalhes, Quantidade } = route.params


  // if (carregando) {
  //   return <Loading />
  // }

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  stretch: {
    width: width / 1.05,
    height: height / 4.3,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
})
