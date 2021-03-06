import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrescPage from '../pages/Prescs';
import Header from '../components/Header';
import ViewPresc from '../pages/ViewPresc';
import BuscaMeds from '../pages/BuscarMedicamento';
import CalcValor from '../pages/CalcValor';
import Entrega from '../pages/Entrega';
import Retirada from '../pages/Retirada';
import ConfirmarEntrega from '../pages/ConfirmarEntrega';
import ConfircaoPedido from '../pages/ConfirmacaoPedido';
import ConfirmarRetirada from '../pages/ConfirmarRetirada';

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
            options={Header("Prescrição")}
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
          <Stack.Screen 
            name='Retirada' 
            component={Retirada} 
            options={Header("Retirada")}
          />
          <Stack.Screen 
            name='Confirmar Retirada' 
            component={ConfirmarRetirada} 
            options={Header("Retirada")}
          />
          <Stack.Screen 
            name='Confirmar Entrega' 
            component={ConfirmarEntrega} 
            options={Header("Confirmar Entrega")}
          />
          <Stack.Screen 
            name='Confirmar Pedido' 
            component={ConfircaoPedido} 
            options={Header("Confirmar Entrega")}
          />

        </Stack.Navigator>
    );
}