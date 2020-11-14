import React from 'react';
import { Dimensions ,Text } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { roxo } from '../constants/colors.json';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import Inicio from '../routes/InicioStack';
import ProfilePage from '../pages/Perfil';
import LastPrescPage from '../pages/LastPresc';
import PrescPage from '../pages/Prescs';
import Config from '../routes/ConfigStack';

const { height } = Dimensions.get('screen');
const Tab = createMaterialBottomTabNavigator();

export default function HomeStack() {
    return (
        <Tab.Navigator
            activeColor="#FFF"
            barStyle={{ 
                backgroundColor: roxo
            }}
        >
            <Tab.Screen 
                name="Inicio" 
                component={Inicio}  
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="home" color={color} size={20} />
                    )  
                }}
            />
            <Tab.Screen 
                name="Perfil" 
                component={ProfilePage}  
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="user-alt" color={color} size={20} />
                    )  
                }}
            />
            <Tab.Screen 
                name="Ultima Prescrição" 
                component={LastPrescPage}  
                options={{
                    tabBarLabel: <Text style={{fontSize: 9.80}}>Ultima prescrição</Text>,
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="file-invoice" color={color} size={20} />
                    )  
                }}
                
            />
            <Tab.Screen 
                name="Histórico de prescrições" 
                component={PrescPage}  
                options={{
                    tabBarLabel: 'Prescrições',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="history" color={color} size={20} />
                    )  
                }}
            />
            <Tab.Screen 
                name="Configurações" 
                component={Config}  
                options={{
                    tabBarLabel: <Text style={{fontSize: 10}}>Configurações</Text>,
                    tabBarIcon: ({ color }) => (
                      <FontAwesome name="gear" color={color} size={26} />
                    )  
                }}
            />

        </Tab.Navigator>
    );
}