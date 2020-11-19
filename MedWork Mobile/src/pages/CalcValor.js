import React, { useContext, useEffect, useState, Component } from 'react';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { Azul, vermelho } from '../constants/colors.json';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import getFarmaciaRemedio from '../api/getFarmaciaRemedio';
import Loading from '../components/Loading';
import { Dropdown } from 'react-native-material-dropdown-v2';


const { height, width } = Dimensions.get('screen');

let data = [
    { value: '1 CX', },
    { value: '2 CX', },
    { value: '3 CX', }];


export default function CalcValor({ route, navigation }) {
    const [Quantidade, SetQuantidade] = useState(1);
    const { item, detalhes } = route.params
    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.stretch}
                    source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
                />
            </View>
            <View style={styles.containerItens}>
                <Text style={styles.labelText}>Produto:</Text>
                <Text style={styles.text}>{detalhes.Remedio}</Text>
                <View style={styles.containerDropdown}>
                    <Text style={styles.labelText}>Quantidade:</Text>
                    <View style={styles.dropdownElement}>
                        <Dropdown
                            label='SELECIONE'
                            data={data}
                            onChangeText= {(event) => {
                                const value = event.split(' ')[0];
                                SetQuantidade(value);
                            }}
                        />
                    </View>
                </View>
                <Text style={styles.precoText}>TOTAL: R${item.preco * Quantidade}</Text>
                <View style={styles.containerButtons}>
                    <Button
                        mode='contained'
                        title='VOLTAR'
                        color={vermelho}
                        contentStyle={styles.editingButtons}
                        style={styles.editingButtonsView}
                        labelStyle={styles.labelStyle}
                    >VOLTAR</Button>
                    <Button
                        mode='contained'
                        title='PRÓXIMO'
                        color={Azul}
                        contentStyle={styles.editingButtons}
                        style={styles.editingButtonsView}
                        labelStyle={styles.labelStyle}
                    >PRÓXIMO</Button>
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
    containerItens: {
        justifyContent: 'center',
        marginLeft: 22
    },
    labelText: {
        marginTop: 18,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#707070'
    },
    labelText: {
        marginTop: 18,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#707070'
    },
    precoText: {
        marginTop: 18,
        fontSize: 23,
        fontWeight: 'bold',
        color: '#707070',
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        marginTop: 2,
        fontSize: 20,
        color: '#909090'
    },
    containerDropdown: {
        marginTop: 5
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
        fontSize: 25,
        fontWeight: "bold"
    },
    containerButtons: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdownElement: {
        width: width /1.12,
        marginTop: 10,
        marginBottom: 30
    }
})