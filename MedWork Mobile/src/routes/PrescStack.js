import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrescPage from '../pages/Prescs';
import Header from '../components/Header';
import ViewPresc from '../pages/ViewPresc';
import BuscaMeds from '../pages/BuscarMedicamento';
import CalcValor from '../pages/CalcValor';
import Entrega from '../pages/Entrega';

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
          <Stack.Screen 
            name='Prescrição' 
            component={ViewPresc} 
            options={Header("Precrição")}
          />
          <Stack.Screen 
            name='Buscar Medicamentos' 
            component={BuscaMeds} 
            options={Header("Buscar Medicamentos")}
          />
          <Stack.Screen 
            name='Calcular Valor' 
            component={CalcValor} 
            options={Header("Calcular Valor")}
          />
          <Stack.Screen 
            name='Entrega' 
            component={Entrega} 
            options={Header("Entrega")}
          />
        </Stack.Navigator>
    );
}