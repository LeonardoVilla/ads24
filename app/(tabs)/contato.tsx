import { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { supabase } from '../../src/supabaseClient';

export default function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const enviarDados = async () => {
    // Validação
    if (!nome.trim() || !telefone.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, preencha todos os campos',
      });
      return;
    }

    const { data, error } = await supabase
      .from('pessoas')
      .insert([{ nome: nome.trim(), telefone: telefone.trim() }]);

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
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={enviarDados}>
        <Text style={styles.textoBotao}>Enviar</Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F4F6F8' },
  input: { width: '90%', height: 45, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, backgroundColor: '#fff' },
  botao: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
  textoBotao: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
