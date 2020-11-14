import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/Login';
import RecuperarSenhaPage from '../pages/RecuperarSenha';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName='Login' headerMode='screen'>
      <Stack.Screen name='Login' 
        component={LoginPage} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Recuperar Senha' component={RecuperarSenhaPage} />
    </Stack.Navigator>
  );
}
