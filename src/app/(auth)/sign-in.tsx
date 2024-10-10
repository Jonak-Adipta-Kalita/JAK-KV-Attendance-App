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
    <KeyboardAvoidingView className="bg-background h-full">
      <View className="gap-y-20 mt-14 flex items-center">
        <Text className="text-4xl text-primary font-bold tracking-wider">
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
            placeholderClassName="text-primary"
          />
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            className="box-style"
            placeholderClassName="text-primary"
          />
          <TouchableOpacity
            onPress={onSignInPress}
            className="box-style bg-primary mt-7"
          >
            <Text className="text-secondary text-center text-xl font-semibold tracking-wider">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
