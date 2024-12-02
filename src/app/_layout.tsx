import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { cssInterop } from "nativewind";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";
import "@/src/globals.css";
import "expo-dev-client"; // Remove in Production?

cssInterop(SafeAreaView, { className: "style" });

// TODO: Setup SplashScreen for Clerk && Metadata
SplashScreen.preventAutoHideAsync();

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

const ClerkLoadedComponent = () => {
    useEffect(() => {
        const asyncFunc = async () => {
            await SplashScreen.hideAsync();
        };
        asyncFunc();
    }, []);

    return (
        <>
            <Slot />
            <StatusBar style="auto" animated translucent />
        </>
    );
};

const RootLayout = () => {
    // TODO: Enable StrictMode for React Compiler

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ClerkLoaded>
                    <ClerkLoadedComponent />
                </ClerkLoaded>
            </GestureHandlerRootView>
        </ClerkProvider>
    );
};

export default RootLayout;
