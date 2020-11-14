import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function SuporteButton({ title, modeValue, ...rest }) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 15
  },
  buttonContainer: {
    width: width / 1.25,
    height: height / 15
  }
});
