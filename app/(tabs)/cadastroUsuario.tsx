import { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { registerUser } from "../../src/services/authService";

export default function CadastroUsuario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (type: "success" | "error", text1: string, text2: string) => {
    Toast.show({ type, text1, text2 });
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      return showToast("error", "Erro", "Preencha todos os campos");
    }

    if (password !== confirmPassword) {
      return showToast("error", "Erro", "As senhas não conferem");
    }

    setLoading(true);
    const { data, error } = await registerUser(email.trim(), password);
    setLoading(false);

    if (error) {
      return showToast("error", "Erro no cadastro", error.message || "Erro desconhecido");
    }

    showToast("success", "Sucesso", "Usuário cadastrado com sucesso!");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/images/adaptive-icon.png")}
        resizeMode="cover"
        style={styles.imgbck}
      >
        <SafeAreaView style={styles.container}>
          <TextInput
            placeholder="Informe seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <TextInput
            placeholder="Informe sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 20,
  },
  input: {
    width: "90%",
    height: 45,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imgbck: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});