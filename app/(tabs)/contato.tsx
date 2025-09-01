import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Platform } from 'react-native';

export default function App() {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [field4, setField4] = useState('');

    const handleSubmit = () => {
        const data = {
            field1,
            field2,
            field3,
            field4,
        };

        if (Platform.OS === 'web') {
            window.alert(JSON.stringify(data, null, 2));
        } else {
            Alert.alert("Valores em JSON", JSON.stringify(data, null, 2));
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Campo 1"
                value={field1}
                onChangeText={setField1}
            />
            <TextInput
                style={styles.input}
                placeholder="Campo 2"
                value={field2}
                onChangeText={setField2}
            />
            <TextInput
                style={styles.input}
                placeholder="Campo 3"
                value={field3}
                onChangeText={setField3}
            />
            <TextInput
                style={styles.input}
                placeholder="Campo 4"
                value={field4}
                onChangeText={setField4}
            />
            <Button title="Gerar JSON" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        padding: 10,
        borderRadius: 5,
    },
});
