import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
    const { isSignedIn } = useAuth();

    if (isSignedIn) return <Redirect href="/(home)" />;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
    );
};

export default AuthLayout;
