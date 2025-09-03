import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://npreacgqgogxwsjqyqdz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcmVhY2dxZ29neHdzanF5cWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNTA4NDUsImV4cCI6MjA3MTgyNjg0NX0.3OIZqqf1b6ErgLvGBv_2DgfmM-gKbZoj6VEbm5CVkA8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ConsultaPessoas() {
  const [pessoas, setPessoas] = useState([]);

  const [loading, setLoading] = useState(true);

  // Carregar os dados do Supabase
  const carregarPessoas = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("pessoas").select("*").order("id", { ascending: false });

    if (error) {
      console.error("Erro ao buscar dados:", error.message);
    } else {
      setPessoas(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

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
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  lista: {
    padding: 16,
  },
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
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  telefone: {
    fontSize: 16,
    color: "#666",
  },
});
