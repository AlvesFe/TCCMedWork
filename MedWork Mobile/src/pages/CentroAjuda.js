import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function CentroAjuda({navigation}) {
    return (
        <View style={styles.container}>
            <List.AccordionGroup>
              <List.Accordion title="Sobre a MedWork" id="1">
                <Text style={{marginHorizontal: 20}}>
                  A MedWork é um facilitador de compras de remédios! Funciona assim: 
                  Seu médico te prescreve a receita, você a partir dessa receita escolhe 
                  a farmácia de sua escolha pelo aplicativo, e pode pedir para a farmácia entregar 
                  no seu endereço ou você pode ir lá retirá-los!
                </Text>
              </List.Accordion>
              <List.Accordion title="Como usar a MedWork" id="2">
                <Text style={{marginHorizontal: 20}}>
                  Acesse o site ou baixe o aplicativo, 
                  efetue o login utilizando o seu e-mail e senha cadastrados,
                  você será direcionado para o seu painel, de lá clique nas suas 
                  últimas prescrições (ou histórico de prescrição se estiver utilizando o site), 
                  clique em buscar medicamento, escolha a farmácia de preferência, verifique o preço e
                  a quantidade e escolha se deseja retirar e que seja entregue.
                  Após isso é só esperar a entrega ou ir buscá-lo na farmácia de escolha!
                </Text>
              </List.Accordion>
              <List.Accordion title="Como entrar em contato" id="6">
                <Text style={{marginHorizontal: 20}}>
                  Você pode nos enviar um e-mail pelo endereço "........" ou se quiser pode nos contatar pelas redes sociais ....
                </Text>
              </List.Accordion>
              <List.Accordion title="Vantagens de usar a MedWork" id="7">
                <Text style={{marginHorizontal: 20}}>
                  Com a MedWork você tem 3 grandes vantagens: A  primeira é saber o que está comprando, 
                  já que sua receita online exibe a bula do medicamento que você foi receitado, 
                  a segunda é poder escolher o melhor estabelecimento pelo preço, sem precisar de horas de busca, 
                  e a terceira é pode pedir o remédio no conforto da sua casa, sem precisar ir para drogaria toda vez que necessita de um remédio!
                </Text>
              </List.Accordion>
              <List.Accordion title="Relação dos hospitais com as drograrias" id="8">
                <Text style={{marginHorizontal: 20}}>
                  Nenhum hospital tem relação direta com drogarias pela MedWork, 
                  nós tomamos o papel de mostrar os melhores estabelecimentos, 
                  e assim não há nenhuma chance de acontecerem os famosos “preços combinados”                
                </Text>
              </List.Accordion>
              <List.Accordion title="Segurança e Privacidade" id="9">
                <Text style={{marginHorizontal: 20}}>
                  Mussum Ipsum, cacilds vidis litro abertis. Pra lá , 
                  depois divoltis porris, paradis. Si num tem leite então bota uma pinga aí cumpadi! 
                  Mé faiz elementum girarzis, nisi eros vermeio. Paisis, filhis, espiritis santis.
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