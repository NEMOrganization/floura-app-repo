import { useEffect } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function LogoutScreen() {
  const { signOut } = useAuth();

  useEffect(() => {
    Alert.alert(
      "Log ud",
      "Er du sikker på, at du vil logge ud?",
      [
        { text: "Nej", style: "cancel" },
        { text: "Ja", onPress: () => signOut() },
      ]
    );
  }, [signOut]);

  return null;
}
