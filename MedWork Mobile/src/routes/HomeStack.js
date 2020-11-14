import React from 'react';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/Perfil';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function HomeStack() {
    return (
        <Tab.Navigator
            activeColor="#FFF"
        >
            <Tab.Screen 
                name="Inicio" 
                component={HomePage}  
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    )  
                }}
            />
            <Tab.Screen 
                name="Inicio" 
                component={ProfilePage}  
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    )  
                }}
            />
        </Tab.Navigator>
    );
}