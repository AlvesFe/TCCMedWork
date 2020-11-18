import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import env from '../../variables';
import { verde_claro } from '../constants/colors.json';
import getFarmaciaRemedio from '../api/getFarmaciaRemedio';
import Loading from '../components/Loading';

const { height, width } = Dimensions.get('screen');

export default function CalcValor({ route, navigation }) {

    const { farmaciaRem } = route.params


    return (
        <View>
            <Text>A</Text>
        </View>
    )
}