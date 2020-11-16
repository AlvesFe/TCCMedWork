import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, DataTable } from 'react-native-paper';

export default function PerfilPage({user, setUser}) {

  return (
    <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text style={{fontSize: 12}}>Nº Prescição</Text></DataTable.Title>
            <DataTable.Title><Text style={{fontSize: 12}}>Data Emissão</Text></DataTable.Title>
            <DataTable.Title><Text style={{fontSize: 12}}>Medicamentos</Text></DataTable.Title>
            <DataTable.Title><Text style={{fontSize: 12}}>Ação</Text></DataTable.Title>
          </DataTable.Header>
          
          {/* <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell >159</DataTable.Cell>
            <DataTable.Cell >6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell>237</DataTable.Cell>
            <DataTable.Cell>8.0</DataTable.Cell>
          </DataTable.Row> */}

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})