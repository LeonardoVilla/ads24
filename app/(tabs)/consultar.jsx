import { useState, useCallback } from "react";
import { SafeAreaView, FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { supabase } from "../../src/supabaseClient";
import { useFocusEffect } from "@react-navigation/native";

export default function ConsultaPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPessoas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pessoas")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Erro ao buscar dados:", error.message);
    } else {
      setPessoas(data || []);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      carregarPessoas();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.telefone}>{item.telefone}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : pessoas.length === 0 ? (
        <Text style={styles.semDados}>Nenhuma pessoa cadastrada.</Text>
      ) : (
        <FlatList
          data={pessoas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F6F8" },
  lista: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  nome: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  telefone: { fontSize: 16, color: "#666" },
  semDados: { textAlign: "center", marginTop: 50, fontSize: 16, color: "#666" },
});