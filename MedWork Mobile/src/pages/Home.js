import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../routes/AuthProvider';

export default function HomePage() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>A home do cara vai aqui</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})