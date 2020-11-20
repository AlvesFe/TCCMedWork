import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/Login';
import RecuperarSenhaPage from '../pages/RecuperarSenha';
import ValidarToken from '../pages/ValidarToken';
import AlterarSenha from '../pages/AlterarSenha';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName='Login' headerMode='screen'>
      <Stack.Screen name='Login' 
        component={LoginPage} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Recuperar Senha' component={RecuperarSenhaPage} />
      <Stack.Screen name='Inserir Token' component={ValidarToken} />
      <Stack.Screen name='Alterar Senha' component={AlterarSenha} />
    </Stack.Navigator>
  );
}
