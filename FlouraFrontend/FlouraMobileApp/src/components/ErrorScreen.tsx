import { View, Text, StyleSheet, Pressable } from "react-native";
import { AppError } from "../errors/appError";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  error: AppError;
  onRetry?: () => void;
};

export default function ErrorScreen({ error, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="warning-outline"
        size={64}
        color="#E63946"
        style={styles.icon}
      />

      <Text style={styles.title}>{error.title}</Text>
      <Text style={styles.message}>{error.message}</Text>

      {error.retryable && onRetry && (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Prøv igen</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#457B9D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

