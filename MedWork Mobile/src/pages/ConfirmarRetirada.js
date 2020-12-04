import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho, cinza, verde } from '../constants/colors.json';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import postCompra from '../api/postCompra';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../components/Loading';

const { height, width } = Dimensions.get('screen');

export default function ConfirmarRetirada({ route, navigation }) {

    const [carregando, setCarregando] = useState(true);
    const { item, detalhes, Quantidade } = route.params

    useEffect(()=>{
        postCompra(item, detalhes, Quantidade, "Retirar", setCarregando, navigation)
    },[])

    if (carregando) {
        return <Loading/>
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.stretch}
                    source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
                />
            </View>
            <View style={styles.containerMess}>
                <Entypo
                    name='check'
                    color={verde}
                    size={50}
                />
                <Text style={styles.text}>EM 30 MINUTOS SEU PEDIDO ESTARÁ</Text>
                <Text style={styles.text}>DISPONIVEL PARA RETIRADA</Text>
            </View>
            <View style={styles.containerViewButtons}>
            <Button
                mode='contained'
                color={vermelho}
                contentStyle={styles.editingButtons}
                style={styles.editingButtonsView}
                labelStyle={styles.labelStyle}
                onPress={()=>{
                    navigation.navigate('Histórico de Prescrições')
                }}
            >FECHAR</Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    stretch: {
        width: width / 1.05,
        height: height / 4.3,
        borderRadius: 5,
        resizeMode: 'stretch',
    },
    containerMess: {
        flex: 1,
        marginTop: width / 3,
        alignItems: "center"
    },
    text: {
        fontSize: width / 22,
        color: '#797979',
        fontWeight: 'bold'
    },
    viewButtons: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    containerViewButtons: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 50,
    },
    editingButtons: {
        width: width / 2.8,
        height: height / 15,
        borderColor: '#7d7d8f',
        borderWidth: 1,

    },
    editingButtonsCr: {
        width: width / 2.2,
        height: height / 15,
        borderColor: '#7d7d8f',
        borderWidth: 1,
    },
    labelStyle: {
        fontSize: width / 20,
        fontWeight: "bold"
    },
})