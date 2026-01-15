import React from "react";
import { Drawer } from "expo-router/drawer";
import { useAuth } from "../../src/context/AuthContext";

export default function AppDrawerLayout() {
    const { signOut } = useAuth();

   return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Tandbørsteeventyr" }} />
      <Drawer.Screen name="reminderSettings" options={{ title: "Påmindelser" }} />
      <Drawer.Screen
        name="logout"
        options={{ drawerItemStyle: { height: 0 } }}
        listeners={{ focus: () => signOut() }}
      />
    </Drawer>
  );
}