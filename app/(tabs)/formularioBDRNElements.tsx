import React, { useState } from 'react';
//npm install react-native-elements react-native-vector-icons
import {
    SafeAreaView,
    ImageBackground,
    Alert,
    View,
    Platform
} from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

const fundo = require('../../assets/images/fundo.jpg'); // ajuste o caminho se necessário

export default function App() {
    const [textNome, setNome] = useState('');
    const [textIdade, setIdade] = useState('');

    const enviar = () => {
        if (!textNome || !textIdade) {
            if (Platform.OS === 'web') {
                window.alert('Erro: Por favor, preencha todos os campos.');
            } else {
                Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            }
            return;
        }

        if (Platform.OS === 'web') {
            window.alert(`Dados Enviados\nNome: ${textNome}\nIdade: ${textIdade}`);
        } else {
            Alert.alert('Dados Enviados', `Nome: ${textNome}\nIdade: ${textIdade}`);
        }
    };

    return (
        <ImageBackground
            source={fundo}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="cover"
        >

            <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 10, padding: 20 }}>
                    <Text h3 style={{ textAlign: 'center', color: '#fff', marginBottom: 20 }}>
                        Jucaco
                    </Text>

                    <Input
                        placeholder="Digite seu nome"
                        value={textNome}
                        onChangeText={setNome}
                        placeholderTextColor="#ccc"
                        inputStyle={{ color: '#fff' }}
                        inputContainerStyle={{ borderBottomWidth: 1, borderColor: '#52acb8' }}
                    />

                    <Input
                        placeholder="Digite sua idade"
                        value={textIdade}
                        onChangeText={setIdade}
                        keyboardType="numeric"
                        placeholderTextColor="#ccc"
                        inputStyle={{ color: '#fff' }}
                        inputContainerStyle={{ borderBottomWidth: 1, borderColor: '#52acb8' }}
                    />

                    <Button
                        title="Enviar"
                        onPress={enviar}
                        buttonStyle={{
                            backgroundColor: '#52acb8',
                            borderRadius: 5,
                            paddingVertical: 12,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
