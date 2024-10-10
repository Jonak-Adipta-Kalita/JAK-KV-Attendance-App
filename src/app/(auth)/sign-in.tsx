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
    <KeyboardAvoidingView className="bg-background flex items-center h-full gap-y-10 mt-10">
      <Text className="text-4xl text-secondary">Sign In</Text>
      {/* <View className="">
        <TextInput
          autoCapitalize="none"
          value={username}
          placeholder="Username"
          onChangeText={(emailAddress) => setUsername(emailAddress)}
          className="input"
        />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className="input"
        />
        <TouchableOpacity
          onPress={onSignInPress}
          // className="rounded-lg p-5 shadow-md bg-primary"
        >
          <Text className="">Sign In</Text>
        </TouchableOpacity>
      </View> */}
    </KeyboardAvoidingView>
  );
};
