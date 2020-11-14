import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
// import colors from '../constants/colors';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  }
});

const ColorsInput = {
  placeholder: '#99C13D', text: '#99C13D', primary: '#99C13D',
  underlineColor: 'transparent', background: '#99C13D'
}
