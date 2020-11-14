import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import Config from '../pages/Config';
import CentroAjuda from '../pages/CentroAjuda';
import Header from '../components/Header'

const Stack = createStackNavigator();

export default function ConfigStack() {
  return (
        <Stack.Navigator 
          initialRouteName='Configurações' 
          headerMode='float'
        >
          <Stack.Screen 
            name='Configurações' 
            component={Config} 
            options={Header("Configurações")}
          />
          <Stack.Screen 
            name='Centro de Ajuda' 
            component={CentroAjuda} 
            options={Header("Centro de Ajuda")}
          />
        </Stack.Navigator>
  );
}