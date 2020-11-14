import { HeaderBackground } from '@react-navigation/stack';
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { roxo } from '../constants/colors.json';
import useStatsBar from '../util/StatusBar';

const Header = ({children}) => {
    const _goBack = () => console.log('Went back');
    useStatsBar('light-content',roxo);
    const title = children.props.initialRouteName
    const subtitle = children.props.children.props.name
    return (
        <>
        <Appbar.Header
            theme={
                {colors:{primary: roxo}}
            }
        >
            { 
                title !== subtitle && 
                <Appbar.BackAction onPress={_goBack} /> 
            }
            <Appbar.Content title={title} subtitle={title !== subtitle ? subtitle : null} /> 
        </Appbar.Header>
        {children}
        </>
    );
};

export default Header;