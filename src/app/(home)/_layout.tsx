import { SignedIn, useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeLayout = () => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        console.log("hello");
        return <Redirect href="/(auth)/sign-in" />;
    }

    return (
        <SignedIn>
            <SafeAreaView className="flex-1 bg-background">
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </SignedIn>
    );
};

export default HomeLayout;
