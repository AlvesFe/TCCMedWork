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
    }, []);

    if (carregando) {
        return <Loading />
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            {
                farmaciaRem[0] &&
                farmaciaRem.map((item, key) => (
                    <FarmaciaRemedio key={key} item={item} navigation={navigation} detalhes={detalhes}></FarmaciaRemedio>
                ))
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
        fontSize: 20,
        fontWeight: "bold"
    },
    containerButton: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: -17
    }
})

function FarmaciaRemedio({item, navigation, detalhes}){
    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.stretch}
                    source={{ uri: `${env.API_URL}/uploads/farmacia/${item.foto}` }} />
            </View>
            <View style={styles.detalhesContainer}>
                <Text style={styles.Title}>{item.Farmacia}</Text>
                <Text style={styles.subTitle}>{item.nome}</Text>
                <View style={styles.containerRow}>
                    <Text style={styles.Title}>{item.preco}</Text>
                    <View style={styles.containerButton}>
                        <Button
                            mode='contained'
                            title='COMPRAR'
                            color={verde_claro}
                            contentStyle={styles.editingButtons}
                            style={styles.editingButtonsView}
                            labelStyle={styles.labelStyle}
                            onPress={() => {
                                navigation.navigate('Calcular Valor', { item, detalhes });
                            } }
                        >COMPRAR</Button>
                    </View>
                </View>
            </View>
        </>
    )
}
