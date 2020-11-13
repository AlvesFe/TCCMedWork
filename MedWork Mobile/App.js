import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import env from './variables';

export default function App() {

  const [users,setUsers] = useState();

  async function getUser(){
    const res = await Axios.get(env.apiUrl+"/paciente").then(res => res.data);
    setUsers(res.data);
  }

  useEffect(() => {
    getUser();
  },[])

  if (!users){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        {users && users.map((element, key) => (
          <TouchableOpacity key={key}>
            <Text style={styles.text}>
              {element.nome}: {element.email}
            </Text>
          </TouchableOpacity>
        ))} 
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000'
  }
});
