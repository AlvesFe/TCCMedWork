import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Loading from '../components/Loading';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho } from '../constants/colors.json';

const { width, height } = Dimensions.get('window');

export default function Retirada({ route, navigation }) {

  const [carregando, setCarregando] = useState(true);
  const { item, detalhes, Quantidade } = route.params
  console.log(item.preco);
  console.log(detalhes);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
        />
        <Text style={styles.LabelText}>ENDEREÇO DE RETIRADA</Text>
        <Text style={styles.info}>{ item.endereco }</Text>
      </View>
      <View style={styles.containerViewButtons}>
        <Text style={styles.infoTotal}><Text style={styles.LabelTotal}>TOTAL: </Text>R${item.preco * Quantidade}</Text>
        <View style={styles.containerButtons}>
          <Button
            mode='contained'
            title='VOLTAR'
            color={vermelho}
            contentStyle={styles.editingButtons}
            style={styles.editingButtonsView}
            labelStyle={styles.labelStyle}
            onPress={() => navigation.goBack()}
          >VOLTAR</Button>
          <View style={styles.margin}></View>
          <Button
            mode='contained'
            title='PRÓXIMO'
            color={Azul}
            contentStyle={styles.editingButtonsCr}
            style={styles.editingButtonsView}
            labelStyle={styles.labelStyleCr}
            onPress={
              () => navigation.navigate('Entrega', { item, detalhes, Quantidade })
            }
          >CONFIRMAR RETIRADA</Button>
        </View>
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
  containerViewButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  editingButtons: {
    width: width / 2.8,
    height: height / 15,
    borderColor: '#7d7d8f',
    borderWidth: 1,

  },
  editingButtonsCr: {
    width: width / 2.2,
    height: height / 15,
    borderColor: '#7d7d8f',
    borderWidth: 1,

  },
  labelStyle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  labelStyleCr: {
    fontSize: width / 27,
    fontWeight: "bold"
  },
  containerButtons: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    marginLeft: 10,
    marginRight: 10
  },
  LabelText: {
    marginTop: 20,
    color: '#707070',
    fontWeight: 'bold',
    fontSize: width / 23
  },
  info: {
    marginTop: 20,
    color: '#797979',
    fontSize: width / 24
  },
  info: {
    marginTop: 20,
    color: '#797979',
    fontSize: width / 24
  },
  infoTotal: {
    marginTop: 20,
    color: '#707070',
    fontSize: width / 16,
    marginBottom: width / 5
  },
  LabelTotal: {
    marginTop: 20,
    color: '#707070',
    fontWeight: 'bold',
    fontSize: width / 16,
    marginBottom: width / 5
  }
})
