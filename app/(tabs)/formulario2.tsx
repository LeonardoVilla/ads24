import { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, TextInput, Text, ImageBackground } from "react-native";

import { StyleSheet } from "react-native";

export default function App() {

    const [textNome, setNome] = useState('');
    const [textIdade, setIdade] = useState('');

    const fundo = require('../../assets/images/fundo.jpg');

    const enviar = () => {
        window.alert(textNome + textIdade);
    }

    return (
        <ImageBackground source={fundo} style={style.fundo} resizeMode="cover">
            
            <SafeAreaView style={style.container}>

                <Text style={style.titulo}>Jucaco</Text>

                <TextInput
                    style={style.inputText}
                    value={textNome}
                    onChangeText={setNome}
                    autoFocus
                />

                <TextInput
                    style={style.inputText}
                    value={textIdade}
                    onChangeText={setIdade}
                />

                <TouchableOpacity style={style.botao} onPress={enviar}>
                    Enviar
                </TouchableOpacity>

            </SafeAreaView>
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    fundo:{
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        verticalAlign: 'middle',
        alignContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'center', // Alinha verticalmente
        alignItems: 'center',     // Alinha horizontalmente
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    }
});
