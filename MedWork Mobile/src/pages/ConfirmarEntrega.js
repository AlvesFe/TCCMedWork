import React, { useContext, useEffect, useState, Component } from 'react';
import { Button, Divider, TextInput } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho, verde } from '../constants/colors.json';
import { View, Text, StyleSheet, Dimensions, Image, Animated, KeyboardAvoidingView } from 'react-native';
import getFarmaciaRemedio from '../api/getFarmaciaRemedio';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen');

export default function ConfirmarEntrega({ route, navigation }) {
    const [user, setUser] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [valor,setValor] = useState('0.00');
    const { item, detalhes, Quantidade } = route.params
    async function getUserData() {
        const data = await AsyncStorage.getItem("userData").then(res => {
            return JSON.parse(res);
        })
        setUser(data)
        setCarregando(false)
    }

    useEffect(() => {
        getUserData();
    }, [])

    if (carregando) {
        return <Loading />
    }

    return (
        // <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={styles.container}>
                        <Image
                            style={styles.stretch}
                            source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
                        />
                        </View>
                        <View style={styles.containerBody}>
                            <Text style={styles.labelTitle}>ENDEREÇO:</Text>
                            <Text style={styles.info}>{user.endereco}</Text>
                        </View>
                        <View style={styles.containerRow}>
                            <View style={styles.containerCow}>
                                <Text style={styles.labelStatus}>PRODUTO:</Text>
                                <Text style={styles.labelStatus}>QUANTIDADE:</Text>
                                <Text style={styles.labelStatus}>TOTAL PRODUTO:</Text>
                                <Text style={styles.labelStatus}>TAXA DE ENTREGA:</Text>
                            </View>
                            <View style={styles.containerCow}>
                                <Text style={styles.infosStatus}>{item.nome}</Text>
                                <Text style={styles.infosStatus}>{Quantidade} CX</Text>
                                <Text style={styles.infosStatus}>R${item.preco * Quantidade}</Text>
                                <Text style={styles.infosStatus}>R${item.taxa}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.alignCenter}>
                                <Divider style={styles.dividor} />
                            </View>
                            <View style={styles.containerRowResult}>
                                <View style={styles.containerCow}>
                                    <Text style={styles.labelStatusTt}>TOTAL:</Text>
                                </View>
                                <View style={styles.containerCow}>
                                    <Text style={styles.labelStatus}>R${item.preco * Quantidade + item.taxa}</Text>
                                </View>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.labelTitle}>PRECISA DE TROCO?</Text>
                                <TextInput
                                    label="Dinheiro"
                                    style={styles.input}
                                    numberOfLines={1}
                                    onChangeText={(text)=> {
                                        setValor(text)
                                    }}
                                    theme={{ colors: { primary: verde } }}
                                    underlineColor={verde}
                                />
                                <View style={styles.containerRow}>
                                    <Button
                                        mode='contained'
                                        title='COMPRAR'
                                        color={vermelho}
                                        contentStyle={styles.editingButtons}
                                        style={styles.editingButtonsView}
                                        labelStyle={styles.labelStyle}
                                        onPress={()=>{
                                            navigation.goBack();
                                        }}
                                    >VOLTAR</Button>
                                    <Button
                                        mode='contained'
                                        title='COMPRAR'
                                        color={verde}
                                        contentStyle={styles.editingButtons}
                                        style={styles.editingButtonsView}
                                        labelStyle={styles.labelStyle}
                                        onPress={()=>{
                                            navigation.navigate('Confirmar Pedido', { item, detalhes, Quantidade, valor })
                                        }}
                                    >FINALIZAR</Button>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        /* </SafeAreaView> */
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
    containerBody: {
        marginTop: 3,
        marginLeft: 20
    },
    labelTitle: {
        marginTop: 10,
        color: '#707070',
        fontWeight: 'bold',
        fontSize: width / 23
    },
    info: {
        marginTop: 5,
        color: '#797979',
        fontSize: width / 24
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    containerCow: {
        marginLeft: 10,
    },
    dividor: {
        justifyContent: 'center',
        width: width / 1.2,
        height: 0.8,
        backgroundColor: '#707070',
    },
    alignCenter: {
        flex: 1,
        alignItems: "center",

    },
    labelStatus: {
        marginTop: 5,
        color: '#707070',
        fontWeight: 'bold',
        fontSize: width / 23
    },
    labelStatusTt: {
        marginTop: 5,
        color: vermelho,
        fontWeight: 'bold',
        fontSize: width / 23
    },
    infosStatus: {
        marginTop: 5,
        color: '#707070',
        fontWeight: 'bold',
        fontSize: width / 23
    },
    containerRowResult: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    input: {
        marginTop: 5,
        width: width / 1.8,
        height: height / 15,
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
    labelStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff'
    },
})