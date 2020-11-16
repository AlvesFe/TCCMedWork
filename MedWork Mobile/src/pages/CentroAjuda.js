import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function CentroAjuda({navigation}) {
    return (
        <View style={styles.container}>
            <List.AccordionGroup>
              <List.Accordion title="Sobre a MedWork" id="1">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Como usar a MedWork" id="2">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Como usar a MedWork no computador" id="3">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Como entrar em contato" id="4">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Como entrar em contato" id="5">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Como entrar em contato" id="6">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Vantagens de usar a MedWork" id="7">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Relação dos hospitais com as drograrias" id="8">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
              <List.Accordion title="Segurança e Privacidade" id="9">
                <Text style={{marginHorizontal: 20}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Morbi quis erat a tellus sollicitudin finibus. 
                  Donec sagittis pretium tortor eu sagittis. 
                  Cras viverra dapibus ligula, vel ullamcorper ante ultricies at. 
                </Text>
              </List.Accordion>
            </List.AccordionGroup>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})