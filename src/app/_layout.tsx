import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { Slot } from "expo-router";
import { cssInterop } from "nativewind";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";

import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";

import "react-native-reanimated";
import "@/src/globals.css";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

cssInterop(SafeAreaView, { className: "style" });

LogBox.ignoreLogs([
  "Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production",
]);

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
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
  // TODO: Show SplashScreen when Clerk is loading.
  const { isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  return (
    // <ClerkLoaded>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
    </GestureHandlerRootView>
    // </ClerkLoaded>
  );
};

export default () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <App />
      <ExpoStatusBar style="dark" />
    </ClerkProvider>
  );
};
