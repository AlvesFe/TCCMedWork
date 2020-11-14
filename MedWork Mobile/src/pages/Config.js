import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/FormButton';
import { AuthContext } from '../routes/AuthProvider';

export default function HomePage({user, setUser}) {

  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})