import React, {useContext, useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Divider, DataTable } from 'react-native-paper';
import { set } from 'react-native-reanimated';
import getDetalhesReceita from '../api/getDetalhesReceita';
import Loading from '../components/Loading';

export default function ViewPresc({route, navigation}) {

  const [detalhes,setDetalhes] = useState(null);
  const [carregando,setCarregando] = useState(true);
  const {receita} = route.params

  useEffect(()=>{
    getDetalhesReceita(receita, setDetalhes)
  },[])

  useEffect(()=>{
    if (detalhes) {
      console.log(detalhes);
      console.log(receita);
      setCarregando(false)
    }
  },[detalhes])

  if(carregando){
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text>ID: {receita.id_Receita}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.infos}>Dr(a): {detalhes.Medico}</Text>
        <Text style={styles.infos}>Especialidade: {detalhes.especialidade}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1'
  },
  infos:{
    marginHorizontal: 5
  }
})