import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { verde_claro } from '../constants/colors.json';
import getFarmaciaRemedio from '../api/getFarmaciaRemedio';
import Loading from '../components/Loading';

const { height, width } = Dimensions.get('screen');

export default function BuscaMeds({ route, navigation }) {

    const [farmaciaRem, setFarmaciaRem] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { detalhes } = route.params

    async function getFarmaciaRem() {
        await getFarmaciaRemedio(detalhes.id_Remedio, setFarmaciaRem);
        setCarregando(false);
    }

    useEffect(() => {
        getFarmaciaRem();
    }, [])

    useEffect(() => {
        console.log(farmaciaRem);
        console.log(carregando);
    }, [farmaciaRem])

    if (carregando) {
        return <Loading />
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            {
                farmaciaRem[0] &&
                (
                    farmaciaRem.map((item, key) => (
                        <>
                            <View key={key} style={styles.container}>
                                <Image
                                    key={Date.now().toString().slice(0,-2)}
                                    style={styles.stretch}
                                    source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }}
                                />
                            </View>
                            <View key={Date.now().toString()+key} style={styles.detalhesContainer}>
                                <Text key={Date.now().toString()-key} style={styles.Title}>{item.Farmacia}</Text>
                                <Text key={Date.now().toString()/(key+25)}style={styles.subTitle}>{item.nome}</Text>
                                <View key={Date.now().toString().slice(0,-5)} style={styles.containerRow}>
                                    <Text key={Date.now().toString().slice(0,-6)} style={styles.Title}>{ item.preco }</Text>
                                    <View key={Date.now().toString().slice(0,-3)} style={styles.containerButton}>
                                        <Button
                                            mode='contained'
                                            key={Date.now().toString().slice(0,-2)}
                                            title='COMPRAR'
                                            color={verde_claro}
                                            contentStyle={styles.editingButtons}
                                            style={styles.editingButtonsView}
                                            labelStyle={styles.labelStyle}
                                            onPress={() => {
                                                alert("COMPROU CARAI");
                                            }}
                                        >COMPRAR</Button>
                                    </View>
                                </View>
                            </View>
                        </>
                    ))
                )
            }
            {
                !farmaciaRem[0] && 
                (
                    <View style={styles.container}>
                        <Text>Não há estabelecimentos que oferecem esse medicamento</Text>
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRow: {
        flexDirection: 'row'
    },
    stretch: {
        width: width / 1.05,
        height: height / 4.3,
        borderRadius: 5,
        resizeMode: 'stretch',
    },
    detalhesContainer: {
        flex: 1,
        marginLeft: 28,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    Title: {
        color: '#2699fb',
        fontSize: height / 22,
        marginBottom: 1,
        alignItems: 'flex-start',
        fontWeight: 'bold'
    },
    subTitle: {
        color: '#50adfb',
        fontSize: height / 45,
        marginBottom: 1,
        alignItems: 'flex-start'
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
    containerButton: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: -17
    }
})