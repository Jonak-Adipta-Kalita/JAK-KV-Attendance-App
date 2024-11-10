import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
    );
};
