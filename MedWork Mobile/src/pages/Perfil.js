import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../routes/AuthProvider';

export default function PerfilPage({user, setUser}) {

  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button onPress={async() => {
        logout();
      }}> Sair </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})