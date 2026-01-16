import { Drawer } from "expo-router/drawer";
import { Redirect } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";

export default function AppDrawerLayout() {
    const { token, signOut } = useAuth();

    if (!token) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Drawer screenOptions={{ headerShown: false }} >
            <Drawer.Screen name="index" options={{ title: "Flouras eventyr" }} />
            <Drawer.Screen name="reminderSettings" options={{ title: "Påmindelser" }} />
            <Drawer.Screen
                name="logout"
                options={{ drawerItemStyle: { height: 0 } }}
                listeners={{ focus: () => signOut() }}
            />
        </Drawer>
  );
}