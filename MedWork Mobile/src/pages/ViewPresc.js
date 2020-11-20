import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import getDetalhesReceita from '../api/getDetalhesReceita';
import { roxo } from '../constants/colors.json';
import Loading from '../components/Loading';
import Button from '../components/FormButton';

const { width, height } = Dimensions.get('window');

export default function ViewPresc({ route, navigation }) {

  const [detalhes, setDetalhes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { receita } = route.params
  console.log(detalhes);

  useEffect(() => {
    getDetalhesReceita(receita, setDetalhes)
    console.log(receita);
  }, [])

  useEffect(() => {
    if (detalhes) {
      setCarregando(false)
    }
  }, [detalhes])

  if (carregando) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Descrição Prescrição</Text>
      <Text style={styles.subTitle}>ID: {receita.id_Receita}</Text>
      <View style={styles.containerInfos}>
        <Text style={styles.infos}>Dr(a): {detalhes.Medico}</Text>
        <Text style={styles.infos}>Especialidade: {detalhes.especialidade}</Text>
        <Text style={styles.infos}>CRM: {detalhes.crm}</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.infos}>Data de emissão: {detalhes.dt_Emissao.slice(0, -14)}</Text>
        <Text style={styles.infos}>Válido até: {detalhes.dt_Validade.slice(0, -14)}</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.infos}>Paciente: {detalhes.Paciente}</Text>
        <Text style={styles.infos}>CPF: {detalhes.cpf}</Text>
        <Text style={styles.infos}>RG: {detalhes.rg}</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.infos}>Medicamento: {receita.nome}</Text>
        <Text style={styles.infos}>Quantidade: {receita.Quantidade}</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.infos}>Dosagem: {detalhes.dosagem}</Text>
      </View>
      <View style={styles.containerInfos}>
        <Text style={styles.infos}>Outras orientações: {detalhes.orientacoes}</Text>
      </View>
      <View style={styles.alignButton}>
        <Button
          title='Buscar'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          color={roxo}
          onPress={() => {
            navigation.navigate('Buscar Medicamentos', {detalhes})
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1'
  },
  alignButton: {
    marginTop: 20
  },
  infos: {
    marginHorizontal: 5,
    marginTop: 17,
    borderBottomWidth: 1,
    borderColor: '#808080',
    fontSize: width/27
  },
  titlePage: {
    color: roxo,
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,
  },
  subTitle: {
    color: roxo,
    marginTop: 45,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20
  },
  containerInfos: {
    flexDirection: 'row',
  },
  loginButtonLabel: {
    fontSize: 18,
    textAlign: 'center',
  },
})