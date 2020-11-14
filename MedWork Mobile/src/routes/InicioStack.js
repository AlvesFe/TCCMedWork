import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Header from '../components/Header'

const Stack = createStackNavigator();

export default function InicioStack() {
  return (
    <Header> 
        <Stack.Navigator 
          initialRouteName='Inicio' 
          headerMode='none'
        >
        <Stack.Screen 
          name='Inicio' 
          component={Home} 
        />
        </Stack.Navigator>
    </Header>
  );
}