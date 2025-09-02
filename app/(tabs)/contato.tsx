import React, { useState } from 'react';
//npx expo install react-native-toast-message
//npm install react-native-toast-message


import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  const handleSubmit = () => {
    const data = { field1, field2, field3, field4 };

    Toast.show({
      type: 'success',
      text1: 'Mensagem enviada!',
      text2: 'Os dados foram processados com sucesso.',
      visibilityTime: 2000,
    });

    if (Platform.OS !== 'web') {
      setTimeout(() => {
        Alert.alert('Valores em JSON', JSON.stringify(data, null, 2));
      }, 2100);
    } else {
      window.alert(JSON.stringify(data, null, 2));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Imagem de fundo */}
      <Image
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        style={StyleSheet.absoluteFill} // cobre toda a tela
      />

      {/* Envolvendo tudo para fechar o teclado */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Fale conosco</Text>

            <TextInput
              style={styles.input}
              placeholder="Campo 1"
              placeholderTextColor="#fff"
              value={field1}
              onChangeText={setField1}
              autoFocus // 👈 esta linha faz o cursor piscar automaticamente
            />
            <TextInput
              style={styles.input}
              placeholder="Campo 2"
              placeholderTextColor="#fff"
              value={field2}
              onChangeText={setField2}
            />
            <TextInput
              style={styles.input}
              placeholder="Campo 3"
              placeholderTextColor="#fff"
              value={field3}
              onChangeText={setField3}
            />
            <TextInput
              style={styles.input}
              placeholder="Campo 4"
              placeholderTextColor="#fff"
              value={field4}
              onChangeText={setField4}
            />
            <Button title="Gerar JSON" onPress={handleSubmit} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Toast container */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
    color: '#fff',
  },
});
