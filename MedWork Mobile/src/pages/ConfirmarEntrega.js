import React, { useContext, useEffect, useState, Component } from 'react';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho, cinza } from '../constants/colors.json';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import getFarmaciaRemedio from '../api/getFarmaciaRemedio';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('screen');

export default function ConfirmarEntrega({ route, navigation }) {
    const [user,setUser] = useState({});
    const [carregando,setCarregando] = useState(true);
    const { item, detalhes, Quantidade } = route.params

    if (carregando) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <Text>Tela de confirmar entregar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})