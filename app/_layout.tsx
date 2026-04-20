import { Stack } from "expo-router";
import { AuthProvider } from "./authcontext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
