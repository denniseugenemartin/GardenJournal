import { TouchableOpacity, Text } from "react-native";
import { useRouter, Href } from "expo-router";

type NavigationButtonProps = {
  label: string;
  icon: string;
  href: Href;
};

export default function NavigationButton({ label, icon, href }: NavigationButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(href)}
      activeOpacity={0.7}
      style={{
        padding: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 32, marginBottom: 8 }}>{icon}</Text>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{label}</Text>
    </TouchableOpacity>
  );
}