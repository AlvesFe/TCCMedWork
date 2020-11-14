import { roxo } from '../constants/colors.json';
import React from 'react';
import { Text } from 'react-native'

const Header = (name) => {

    const options = {
        headerStyle: {
          backgroundColor: roxo
        },
        title: <Text style={{color: '#FFF'}}>{name}</Text>,
        headerTintColor: "#FFF"
      }

    return options;
};

export default Header;