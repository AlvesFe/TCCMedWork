import React, { useContext, useEffect, useState, Component } from 'react';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho, cinza } from '../constants/colors.json';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import getFarmaciaRemedio from '../api/getFarmaciaRemedio';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('screen');


export default function Entrega({ route, navigation }) {
    const [user,setUser] = useState({});
    const [carregando,setCarregando] = useState(true);
    const { item, detalhes, Quantidade } = route.params

    async function getUserData() {
        const item = await AsyncStorage.getItem("userData").then(res => {
            return JSON.parse(res);
        })
        setUser(item)
        setCarregando(false)
    }

    useEffect(() => {
        getUserData();
        console.log(item);
    },[])

    if (carregando) {
        return <Loading />
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.stretch}
                    source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
                />
                <View style={styles.container}>
                    <Text style={styles.tarjaStyle}>ATENÇÃO!</Text>
                    <Text style={styles.tarjaStyle}>MEDICAMENTOS TARJA PRETA</Text>
                    <Text style={styles.tarjaStyle}>SÓ PODEM SER COMPRADOS PRESENCIALMENTE</Text>
                </View>
            </View>
            <View style={styles.containerEndereco}>
                <Text style={styles.labelText}>Endereço de Entrega:</Text>
                <Text style={styles.info}>{user.endereco}</Text>
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.labelText}>TAXA DE ENTREGA: R${item.taxa}</Text>
            </View>
            <View style={styles.containerButtonsPai}>
                <View style={styles.containerButtons}>
                    <Button
                        mode='contained'
                        title='VOLTAR'
                        color={cinza}
                        contentStyle={styles.editingButtonsRt}
                        style={styles.editingButtonsView}
                        labelStyle={styles.labelStyleRt}
                        onPress={()=>{
                            navigation.navigate('Retirada', { item, detalhes, Quantidade })
                        }}
                    >RETIRAR NO LOCAL</Button>
                </View>
                <View style={styles.containerButtons}>
                    <Button
                        mode='contained'
                        title='VOLTAR'
                        color={vermelho}
                        contentStyle={styles.editingButtons}
                        style={styles.editingButtonsView}
                        labelStyle={styles.labelStyle}
                        onPress={() => navigation.goBack()}
                    >VOLTAR</Button>

                    {
                        item.tarja !== "PRETA" &&

                        <Button
                            mode='contained'
                            title='PRÓXIMO'
                            color={Azul}
                            contentStyle={styles.editingButtons}
                            style={styles.editingButtonsView}
                            labelStyle={styles.labelStyle}
                            onPress={() =>{
                                navigation.navigate('Confirmar Entrega', { detalhes, item, Quantidade })
                            }}
                        >PRÓXIMO</Button>
                    }
                </View>
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
    tarjaStyle: {
        color: vermelho,
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 1,
    },
    containerEndereco: {
        marginTop: 40,
        marginLeft: 22
    },
    labelText: {
        color: '#707070',
        fontWeight: 'bold',
        fontSize: 22
    },
    info: {
        fontSize: 19,
        color: '#949494'
    },
    containerInfo: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    editingButtonsView: {
        marginHorizontal: 5,
    },
    editingButtons: {
        width: width / 2.8,
        height: height / 15,
        borderColor: '#7d7d8f',
        borderWidth: 1,
    },
    editingButtonsRt: {
        width: width / 1.5,
        height: height / 15,
        borderColor: '#7d7d8f',
        borderWidth: 1,
    },
    labelStyle: {
        fontSize: 25,
        fontWeight: "bold"
    },
    labelStyleRt: {
        fontSize: 19,
        fontWeight: "bold",
        color: '#fff'
    },
    containerButtons: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 5,
    },
    containerButtonsPai: {
        marginTop: 30
    }
})