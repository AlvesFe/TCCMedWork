import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { key } from '../../variables';
import getReceitas from '../api/getReceitas';
import { vermelho } from '../constants/colors.json';

const { height ,width } = Dimensions.get('screen')

export default function PerfilPage() {

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
              <>
              <DataTable.Row key={key}>
                <DataTable.Cell>{element.nome}</DataTable.Cell>
                <DataTable.Cell >{element.dt_Emissao.slice(0, -14)}</DataTable.Cell>
                <DataTable.Cell >{element.Quantidade}</DataTable.Cell>
                <DataTable.Cell >  
                    <Text style={styles.listButton} onPress={()=> console.log("show")}>VER</Text>
                </DataTable.Cell>
              </DataTable.Row>
              </>
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
              console.log(page);
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
})