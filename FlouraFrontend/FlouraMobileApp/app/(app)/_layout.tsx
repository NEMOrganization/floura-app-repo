import React from "react";
import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { useAuth } from "../../src/context/AuthContext";
import LoadingScreen from "@/src/screens/LoadingScreen";

function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Log ud",
      "Er du sikker på, at du vil logge ud?",
      [
        { text: "Nej", style: "cancel" },
        { text: "Ja", style: "destructive", onPress: () => signOut() },
      ]
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View style={styles.items}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.logout}>Log ud</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerWrapper() {
  const { token, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Drawer 
      drawerContent={(props) => <CustomDrawerContent {...props}/>}
      screenOptions={{ 
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#FCF9EA",
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: "#432323",
        },
        drawerActiveBackgroundColor: "#E3F2EA",
        drawerActiveTintColor: "#850E35",
        drawerInactiveTintColor: "#432323",
        }}
      >
      <Drawer.Screen 
        name="index" 
        options={{ title: "Flouras eventyr" }} />
      <Drawer.Screen 
      name="reminderSettings" options={{ title: "Påmindelser" }} />
    </Drawer>
  );
}

export default function AppDrawerLayout() {
  return <DrawerWrapper />;
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E3F2EA",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#850E35",
  },
  subtitle: {
    fontSize: 14,
    color: "#432323",
    marginTop: 4,
  },
  items: {
    paddingTop: 12,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E3F2EA",
  },
   logoutButton: {
    paddingVertical: 8,
  },
  logout: {
    fontSize: 16,
    color: "#850E35",
  },
});
