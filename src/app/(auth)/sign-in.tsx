import React, { useCallback, useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

export default () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, username, password]);

  return (
    <View className="bg-background h-full flex items-center">
      <KeyboardAvoidingView className="gap-y-20 mt-10 flex items-center">
        <Text className="text-4xl text-primary font-semibold tracking-wider">
          Sign In
        </Text>
        <View className="flex items-center justify-center gap-y-7">
          <TextInput
            autoCapitalize="none"
            autoFocus
            value={username}
            placeholder="Username"
            onChangeText={(emailAddress) => setUsername(emailAddress)}
            className="box-style"
          />
          <TextInput
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            className="box-style"
          />
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={!isLoaded || !username || !password}
            className="box-style bg-primary mt-7 disabled:opacity-50"
          >
            <Text className="text-secondary text-center text-xl font-semibold tracking-wider">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* TODO: Hide the Credits when keyboard is active. */}
      <View className="flex items-center absolute bottom-10 gap-y-2">
        <Text className="text-primary text-sm font-semibold">
          Designed and Built by
        </Text>
        <Text className="text-primary text-sm font-semibold">
          <Text className="font-bold">Jonak Adipta Kalita</Text> @ 2024 - Grade
          11th
        </Text>
      </View>
    </View>
  );
};
