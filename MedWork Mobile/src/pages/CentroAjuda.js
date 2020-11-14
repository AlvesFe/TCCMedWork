import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CentroAjuda({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Centro de ajuda do cara aqui</Text>
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