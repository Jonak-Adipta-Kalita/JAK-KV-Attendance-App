import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

// TODO: Only allow Admin Account to create Users

export default () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const process = await signUp.create({
        username,
        password,
      });
      await setActive({ session: process.createdSessionId });
      router.replace("/");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        value={username}
        placeholder="Username..."
        onChangeText={(email) => setUsername(email)}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign Up" onPress={onSignUpPress} />
    </View>
  );
};
