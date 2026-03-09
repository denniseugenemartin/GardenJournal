import { View, Text, StyleSheet } from "react-native";

export default function GardenJournalLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🌿</Text>

      <Text style={styles.garden}>Garden</Text>
      <Text style={styles.journal}>Journal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 50,
  },

  icon: {
    fontSize: 72,
    marginBottom: 10,
  },

  garden: {
    fontSize: 52,
    fontWeight: "800",
    color: "#2e7d32",
    letterSpacing: 1,
  },

  journal: {
    fontSize: 28,
    fontWeight: "400",
    color: "#4a7c59",
    letterSpacing: 2,
  },
});