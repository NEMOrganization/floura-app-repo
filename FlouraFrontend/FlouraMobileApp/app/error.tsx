import { useLocalSearchParams } from "expo-router";
import ErrorScreen from "@/src/screens/ErrorScreen";

export default function ErrorRoute() {
    const { message } = useLocalSearchParams<{ message: string }>();
    return <ErrorScreen message={typeof message === "string" ? message : undefined} />;   
}