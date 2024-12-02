// TODO: Load the classTeachersData from a backend database instead of a json
import classTeachersData from "@/metadata.json";

import React, { useEffect, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkLoaded, ClerkProvider, useUser } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { cssInterop } from "nativewind";
import * as SplashScreen from "expo-splash-screen";
import { useTeacherStore } from "../store";

import "react-native-reanimated";
import "@/src/globals.css";
import "expo-dev-client"; // Remove in Production?
import { ClassTeacherData } from "@/@types/typings";

cssInterop(SafeAreaView, { className: "style" });
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

const App = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const setTeacherData = useTeacherStore((state) => state.setTeacherData);

    const classTeacherData = useMemo(() => {
        if (!isSignedIn || !user) return null;

        const classTeacherData: ClassTeacherData[] =
            classTeachersData.class_teachers.map((teacher) => ({
                ...teacher,
                students: teacher.students.map((student) => ({
                    ...student,
                    attendance: "present",
                })),
            }));
        return classTeacherData.find((teacher) => teacher.id === user!.id)!;
    }, [user, isSignedIn]);

    useEffect(() => {
        const hideSplashScreen = async () => {
            await SplashScreen.hideAsync();
        };

        if (isLoaded) {
            if (isSignedIn && classTeacherData)
                setTeacherData(classTeacherData);

            hideSplashScreen();
        }
    }, [setTeacherData, user, classTeacherData, isLoaded, isSignedIn]);

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
                    <App />
                </ClerkLoaded>
            </GestureHandlerRootView>
        </ClerkProvider>
    );
};

export default RootLayout;
