import React, { useContext, useEffect, useState, Component } from 'react';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho, cinza } from '../constants/colors.json';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import Loading from '../components/Loading';

const { height, width } = Dimensions.get('screen');

export default function ConfirmacaoPedido({ route, navigation }) {

    const [carregando,setCarregando] = useState(true);

    if (carregando) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <Text>Tela de confirmação do pedido</Text>
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