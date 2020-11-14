import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Header from '../components/Header'
import useStatusBar from '../util/StatusBar';
import { roxo } from '../constants/colors.json';

const Stack = createStackNavigator();

export default function InicioStack() {
  useStatusBar("light-content", roxo )
  return (
    <Stack.Navigator 
      initialRouteName='Inicio' 
      headerMode='float'
    >
    <Stack.Screen 
      name='Inicio' 
      component={Home} 
      options={Header("Inicio")}
    />
    </Stack.Navigator>
  );
}

// {
//   headerStyle: {
//     backgroundColor: roxo
//   },
//   title: <Text style={{color: '#FFF'}}>Inicio</Text>
// }