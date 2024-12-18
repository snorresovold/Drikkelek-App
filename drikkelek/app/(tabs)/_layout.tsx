import { Stack, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "@react-navigation/native";
import { IdProvider } from "@/context/IdProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <IdProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Hjem", headerShown: false }}
        />
        <Stack.Screen
          name="NewGroup"
          options={{ title: "Ny gruppe", headerShown: false }}
        />
        <Stack.Screen
          name="JoinGroup"
          options={{ title: "Bli med i gruppe", headerShown: false }}
        />
        <Stack.Screen
          name="games/[code]"
          options={{ title: "spill", headerShown: false }}
        />
      </Stack>
    </IdProvider>
  );
}
