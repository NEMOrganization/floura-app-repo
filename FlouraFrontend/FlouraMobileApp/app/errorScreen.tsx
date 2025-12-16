import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import errorImage from "../assets/images/errorImageDino.png";
import Button from "../src/components/Button";



export default function ErrorScreen() { 
    const {message } = useLocalSearchParams<{message?: string}>();
    const router = useRouter();

  return (
    <View style={styles.container}>
        <Image 
        source={errorImage}
        style={styles.image}
        resizeMode="contain"/>

      <Text style={styles.title}>Hovsa!</Text>  
      <Text style={styles.text}>{message || "Historien gemmer sig vist"}</Text>

    <View style={styles.buttonContainer}>
        <Button 
          title="Prøv igen" 
          onPress={() => router.replace("/")} 
          variant="secondary" 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#FFE8CD", },
  title:{fontSize: 35, color: "#850E35", marginBottom: 10, textAlign:"center", fontFamily:"Roboto" },
  text: { fontSize: 30, color: "#850E35", marginBottom: 30, textAlign: "center", fontFamily:"Roboto" },
  image: { width: 150, height: 150, marginBottom: 20,},
  buttonContainer:{}
});
