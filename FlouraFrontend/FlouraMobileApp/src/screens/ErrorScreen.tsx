import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import errorImage from "../../assets/images/FlouraErrorScreenBasic.png";
import Button from "../components/CustomButton";

type Props = {
  message?: string;
};

export default function ErrorScreen({ message }: Props) { 
  const router = useRouter();
  const displayMessage = message ?? "Der skete en fejl";


  return (
    <View style={styles.container}>
        <Image 
        source={errorImage}
        style={styles.image}
        resizeMode="contain"/>

      <Text style={styles.title}>Hovsa!</Text>  
      <Text style={styles.text}>{displayMessage}</Text>

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
  image: { width: 350, height: 350, marginBottom: -40,},
  buttonContainer:{}
});
