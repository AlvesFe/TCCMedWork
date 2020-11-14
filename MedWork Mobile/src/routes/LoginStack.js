import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/Login';

const Stack = createStackNavigator();

export default function LoginStack({setUser}) {
  return (
    <Stack.Navigator initialRouteName='Login' headerMode='none'>
      <Stack.Screen name='Login' initialParams={{setUser}} component={LoginPage} />
    </Stack.Navigator>
  );
}
