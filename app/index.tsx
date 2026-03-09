import { ScrollView, View } from "react-native";
import NavigationButton from "../components/navigation-button";
import GardenJournalLogo from "../components/garden-journal-logo";

import { Routes } from "../constants/routes";

export const navigationOptions = [
  { id: "observations", label: "Record Observations", icon: "🔍", href: Routes.Observations },
  { id: "calendar", label: "Calendar", icon: "📅", href: Routes.Calendar },
  { id: "garden", label: "Garden", icon: "🌸", href: Routes.Garden },
  { id: "profile", label: "User Profile", icon: "🎩", href: Routes.Profile },
] as const;

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f0" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            marginHorizontal: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            alignItems: "center",
          }}
        >
          <GardenJournalLogo />

           {navigationOptions.map((option) => (
            <NavigationButton
              key={option.id}
              label={option.label}
              icon={option.icon}
              href={option.href}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}