import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import getReceitas from '../api/getReceitas';
import { vermelho,roxo } from '../constants/colors.json';

export default function PrescsPage({navigation}) {

  const [receitas,setReceitas] = useState(null);

  useEffect(() => {
    getReceitas(setReceitas);
  },[])

  return (
    <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={{fontSize: 12}}>Medicamento</Text></DataTable.Title>
            <DataTable.Title><Text style={{fontSize: 12}}>Data Emissão</Text></DataTable.Title>
            <DataTable.Title><Text style={{fontSize: 12}}>Quantidade</Text></DataTable.Title>
            <DataTable.Title><Text style={{fontSize: 12}}>Ação</Text></DataTable.Title>
          </DataTable.Header>

          {
            receitas && 
            receitas.map((element, key) =>(
              <DataTable.Row key={key}>
                <DataTable.Cell style={styles.listText} key={Math.random(Date.now()+1)}>{element.nome}</DataTable.Cell>
                <DataTable.Cell key={Math.random(Date.now()+2)}>{element.dt_Emissao.slice(0, -14)}</DataTable.Cell>
                <DataTable.Cell key={Math.random(Date.now()+3)}>{element.Quantidade}</DataTable.Cell>
                <DataTable.Cell key={Math.random(Date.now()+4)}>  
                    <Text key={Math.random(Date.now()+5)} 
                      style={styles.listButton} onPress={()=> navigation.navigate("Prescrição", { receita: element })}
                    >
                    VER
                    </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          }
          
 
          {/* <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell>237</DataTable.Cell>
            <DataTable.Cell>8.0</DataTable.Cell>
            <DataTable.Cell>8.0</DataTable.Cell>
          </DataTable.Row> */}

          {/* <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
            }}
            label="1-2 of 6"
          /> */}
        </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  editingButtonsView: {
    marginHorizontal: 5
  },
  editingButtons:{
    width: 5,
    height: 5
  },
  listButton: {
    color: vermelho,
  },
  listText:{
    color: "#FFF"
  }
})