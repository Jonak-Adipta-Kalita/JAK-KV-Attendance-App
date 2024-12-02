import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, LogBox } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { cssInterop } from "nativewind";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";
import "@/src/globals.css";

cssInterop(SafeAreaView, { className: "style" });

// TODO: Setup SplashScreen for Clerk && Metadata
// SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//     duration: 1000,
//     fade: true,
// });

LogBox.ignoreLogs([
    "Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production",
]);

const tokenCache = {
    async getToken(key: string) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (_) {
            await SecureStore.deleteItemAsync(key);
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (_) {
            return;
        }
    },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

const RootLayout = () => {
    // TODO: Enable StrictMode for React Compiler

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ClerkLoaded>
                    <Slot />
                </ClerkLoaded>
                <ClerkLoading>
                    <SafeAreaView className="flex-1 bg-background flex items-center justify-center">
                        <ActivityIndicator
                            size="large"
                            style={{
                                width: 70,
                                height: 70,
                                transform: [{ scale: 1.5 }],
                            }}
                            color="#e0e0e0"
                        />
                    </SafeAreaView>
                </ClerkLoading>
                <StatusBar style="auto" animated translucent />
            </GestureHandlerRootView>
        </ClerkProvider>
    );
};

export default RootLayout;
