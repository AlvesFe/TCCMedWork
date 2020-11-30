import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Appbar, Avatar, Button } from 'react-native-paper';
import { roxo, verde } from '../constants/colors.json';
import Loading from '../components/Loading';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStatusBar from '../util/StatusBar';
import patchUser from '../api/patchUser';
import env from '../../variables';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const url = env.API_URL;

const { height, width } = Dimensions.get('screen')

export default function PerfilPage() {
  useStatusBar("light-content", roxo)

  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [viewing, setViewing] = useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    getUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setUser({ ...user, foto: result.uri })

    if (!result.cancelled) {
      setImage(result.uri);
      setUser({ ...user, image: result});
    }    
  };

  async function getUserData() {
    try {
      const item = await AsyncStorage.getItem("userData").then(res => {
        return JSON.parse(res);
      })
      setUser(item)
      setCarregando(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Appbar.Header
        theme={{
          colors: { primary: roxo }
        }}
      >
        <Appbar.Content title="Meu perfil" subtitle={viewing ? "Visualizar" : "Alterar"} />
      </Appbar.Header>
      {
        carregando && <Loading />
      }
      {
        !carregando &&
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <TouchableOpacity disabled={viewing} onPress={pickImage}>
                <Avatar.Image size={height / 6} source={{ uri: image != null ? image : env.API_URL + '/uploads/paciente/' + user.foto }} />
                {
                  viewing === false ? <FontAwesome name='camera' style={styles.labelImage} size={20} color='#fff'/>: null
                }
                
              </TouchableOpacity>
              <Text style={styles.name}>{user.nome}</Text>
            </View>
            <View style={styles.infoContainer}>
              <FormInput
                labelName='Nome'
                value={user.nome}
                onChangeText={text => setUser({ ...user, nome: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={viewing}
              />
              <FormInput
                labelName='Nacimento'
                value={user.dt_Nascimento.slice(0, -14)}
                onChangeText={text => setUser({ ...user, dt_Nascimento: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={true}
              />
              <FormInput
                labelName='Tipo sanguineo'
                value={user.tp_sanguineo}
                onChangeText={text => setUser({ ...user, tp_sanguineo: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={viewing}
              />
              <FormInput
                labelName='Endereço'
                value={user.endereco}
                onChangeText={text => setUser({ ...user, endereco: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={viewing}
              />
              <FormInput
                labelName='CPF'
                value={user.cpf}
                onChangeText={text => setUser({ ...user, cpf: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={true}
              />
              <FormInput
                labelName='RG'
                value={user.rg}
                onChangeText={text => setUser({ ...user, rg: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={true}
              />
              <FormInput
                labelName='Telefone'
                value={user.telefone}
                onChangeText={text => setUser({ ...user, telefone: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={viewing}
              />
              <FormInput
                labelName='E-mail'
                value={user.email}
                onChangeText={text => setUser({ ...user, email: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={true}
              />
              <FormInput
                labelName='Alergias'
                value={user.alergia}
                onChangeText={text => setUser({ ...user, alergia: text })}
                theme={{ colors: { primary: verde } }}
                underlineColor={verde}
                disabled={viewing}
              />
              {
                viewing &&
                <FormButton
                  title='Alterar dados'
                  modeValue='contained'
                  labelStyle={styles.alterButton}
                  color={roxo}
                  onPress={() => {
                    setViewing(false);
                  }}
                />
              }
              {
                !viewing &&
                <View style={styles.alterContainer}>
                  <View >
                    <Button
                      mode='contained'
                      color={roxo}
                      contentStyle={styles.editingButtons}
                      onPress={() => {
                        patchUser(user, setViewing, setUser)
                      }}
                      style={styles.editingButtonsView}
                    >
                      Salvar
                    </Button>
                  </View>
                  <Button
                    mode='contained'
                    color={roxo}
                    contentStyle={styles.editingButtons}
                    onPress={() => {
                      setViewing(true)
                      getUserData()
                    }}
                    style={styles.editingButtonsView}
                  >
                    Cancelar
                    </Button>
                </View>
              }
            </View>
          </ScrollView>
        </SafeAreaView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F1F1F1",
    marginTop: 15
  },
  infoContainer: {
    borderRadius: 10,
    elevation: 17,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginVertical: height / 30
  },
  name: {
    fontSize: 22,
  },
  alterButton: {
    fontSize: 18
  },
  editingButtonsView: {
    marginHorizontal: 5
  },
  editingButtons: {
    width: width / 3,
    height: height / 15
  },
  alterContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  labelImage: {
    borderRadius: height,
    marginTop: 88,
    marginRight: 10,
    opacity: 0.9,
    position:'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#363636',
    padding: 6
  }
})