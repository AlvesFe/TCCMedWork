import React from 'react';
import { View, Text } from 'react-native';
import Providers from './src/routes';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
    <Providers />
    <Toast style={{elevation: 5, zIndex: 5}} ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}