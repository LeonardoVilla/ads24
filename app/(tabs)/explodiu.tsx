import { useState } from 'react';
import { Pessoa } from '../../src/models/Pessoa'; 
//npm install @supabase/supabase-js


import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default function App() {
    const [campoNome, setNome] = useState('');
    const [campoTelefone, setTlelefone] = useState('');

    const pessoa = new Pessoa(campoNome, campoTelefone); //com objeto da classe Obs: Não é algo usual por quem programa em react

    const dados = { //sem objeto da classe
        nome: campoNome,
        telefone: Number(campoTelefone),
    };

    const enviarDados = () => {
        window.alert(dados.nome + dados.telefone * 5);
        window.alert(pessoa.nome + pessoa.telefone * 5);
    };

    return (
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
                    onChangeText={setTlelefone}
                    keyboardType="numeric"
                    //keyboardType="decimal-pad" para valores decimais
                    style={styles.input}
                />
                <TouchableOpacity style={styles.botao} onPress={enviarDados}>
                    <Text style={styles.textoBotao}>Enviar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
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