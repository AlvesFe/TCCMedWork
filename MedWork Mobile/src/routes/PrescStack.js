import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrescPage from '../pages/Prescs';
import Header from '../components/Header'

const Stack = createStackNavigator();

export default function PrescStack() {
    return (
        <Stack.Navigator 
          initialRouteName='Configurações' 
          headerMode='float'
        >
          <Stack.Screen 
            name='Histórico de Prescrições' 
            component={PrescPage} 
            options={Header("Histórico de Prescrições")}
          />
        </Stack.Navigator>
    );
}