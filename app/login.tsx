import { Button, Linking, Text, View } from "react-native";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function LoginScreen() {
  const handleLogin = (provider: "google" | "facebook") => {
    const url = `${BACKEND_URL}/auth/${provider}`;
    Linking.openURL(url);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        User Profile
      </Text>

      <Button title="Login with Google" onPress={() => handleLogin("google")} />
      <View style={{ height: 10 }} />
    </View>
  );
}
