import { useState } from 'react';
import { Pessoa } from '../../src/models/Pessoa'; 
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

// Supabase client - configure sua URL e anon key aqui:
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://npreacgqgogxwsjqyqdz.supabase.co';  // coloque sua URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcmVhY2dxZ29neHdzanF5cWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNTA4NDUsImV4cCI6MjA3MTgyNjg0NX0.3OIZqqf1b6ErgLvGBv_2DgfmM-gKbZoj6VEbm5CVkA8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [campoNome, setNome] = useState('');
  const [campoTelefone, setTelefone] = useState('');

  const enviarDados = async () => {
    if (!campoNome.trim() || !campoTelefone.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, preencha todos os campos',
      });
      return;
    }

    const pessoa = new Pessoa(campoNome, campoTelefone);

    const { data, error } = await supabase
      .from('pessoas')
      .insert([{ nome: pessoa.nome, telefone: pessoa.telefone }]);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar dados',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Dados enviados com sucesso!',
      });
      setNome('');
      setTelefone('');
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/adaptive-icon.png')}
        resizeMode="cover"
        style={styles.imgbck}
      >
        <SafeAreaView style={styles.conteudo}>
          <TextInput
            placeholder="Informe seu Nome"
            value={campoNome}
            onChangeText={setNome}
            autoFocus
            style={styles.input}
          />
          <TextInput
            placeholder="Informe seu telefone"
            value={campoTelefone}
            onChangeText={setTelefone}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.botao} onPress={enviarDados}>
            <Text style={styles.textoBotao}>Enviar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center', // centraliza horizontalmente
    backgroundColor: 'rgba(255,255,255,0.7)', // fundo semi-transparente para destacar o conteúdo
    paddingHorizontal: 20,
  },
  input: {
    width: '90%',
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgbck: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});