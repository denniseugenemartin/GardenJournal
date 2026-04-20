import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { useAuth } from "./authcontext";

export default function ProfileScreen() {
  const { user, loading, logout } = useAuth(); // 👈 add logout
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  if (loading) return <ActivityIndicator />;

  if (!user) return null;

  return (
    <View>
      <Text>{`Welcome ${user.name}`}</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
