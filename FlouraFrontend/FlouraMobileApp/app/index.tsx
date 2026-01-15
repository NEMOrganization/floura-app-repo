import { useEffect } from "react";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "@/src/screens/LoadingScreen";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("../stories");
      } else {
        router.replace("../login");
      }
    };
    checkAuth();
  }, []);
  return <LoadingScreen />;
}
