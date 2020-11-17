import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Button, DataTable } from 'react-native-paper';

export default function BuscaMeds({route, navigation}) {

    const {detalhes} = route.params

    return (
        <View style={styles.container}>
            <Text>{detalhes.id_Remedio}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})