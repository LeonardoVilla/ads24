//npx expo install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { Alert, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

// 🔔 Função unificada para alertas
const mostrarAlerta = (titulo: string, mensagem: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
};


export default function App() {
  const [textNome, setNome] = useState('');
  const [textIdade, setIdade] = useState('');

  const fundo = require('../../assets/images/fundo.jpg');

  const enviar = async () => {
    if (!textNome || !textIdade) {
      mostrarAlerta("Campos obrigatórios", "Preencha todos os campos.");
      return;
    }

    try {
      const dadosExistentes = await AsyncStorage.getItem('pessoas');
      const pessoas = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      const novaPessoa = {
        nome: textNome,
        idade: textIdade
      };

      pessoas.push(novaPessoa);
      await AsyncStorage.setItem('pessoas', JSON.stringify(pessoas));

      setNome('');
      setIdade('');
      mostrarAlerta("Sucesso", "Dados salvos com sucesso!");

    } catch (e) {
      console.error("Erro ao salvar dados:", e);
      mostrarAlerta("Erro", "Houve um problema ao salvar os dados.");
    }
  };

  return (
    <ImageBackground source={fundo} style={style.fundo} resizeMode="cover">
      <SafeAreaView style={style.container}>
        <Text style={style.titulo}>Jucaco</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#aaa"
          style={style.inputText}
          value={textNome}
          onChangeText={setNome}
          autoFocus
        />

        <TextInput
          placeholder="Idade"
          placeholderTextColor="#aaa"
          style={style.inputText}
          value={textIdade}
          onChangeText={setIdade}
          keyboardType="numeric"
        />

        <TouchableOpacity style={style.botao} onPress={enviar}>
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Enviar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  fundo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    verticalAlign: 'middle',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 24,
    verticalAlign: 'middle',
    marginBottom: 10,
    color: '#fff'
  },
  inputText: {
    margin: 10,
    width: '90%',
    height: 50,
    borderColor: '#52acb8',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#fff',
    borderRadius: 5,
    backgroundColor: '#1a1a1a'
  },
  botao: {
    margin: 10,
    width: '90%',
    height: 50,
    borderColor: '#52acb8',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
