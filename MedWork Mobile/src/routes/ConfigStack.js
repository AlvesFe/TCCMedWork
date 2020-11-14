import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Config from '../pages/Config';
import Header from '../components/Header'

const Stack = createStackNavigator();

export default function ConfigStack() {
  return (
    <Header> 
        <Stack.Navigator 
          initialRouteName='Configurações' 
          headerMode='none'
        >
        <Stack.Screen 
          name='Configurações' 
          component={Config} 
        />
        </Stack.Navigator>
    </Header>
  );
}