import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
  Animated,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signingIn, setSigningIn] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);

  const fadeOpacity = useRef(new Animated.Value(1));

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setSigningIn(true);
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
      setSigningIn(false);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setSigningIn(false);
    }
  }, [isLoaded, username, password]);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(fadeOpacity.current, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(fadeOpacity.current, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();

      fadeOpacity.current.removeAllListeners();
    };
  }, []);

  return (
    <KeyboardAvoidingView className="bg-background h-full flex items-center">
      <View className="gap-y-20 mt-10 flex items-center">
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
          <View className="flex flex-row items-center justify-center relative">
            <TextInput
              autoCapitalize="none"
              autoComplete={"password"}
              secureTextEntry={!viewPassword ? true : false}
              value={password}
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              className="box-style"
            />
            <TouchableOpacity
              onPress={() => setViewPassword(!viewPassword)}
              className="absolute right-7"
              activeOpacity={0.55}
            >
              {!viewPassword ? (
                <FontAwesome5 name="eye" size={22} color="#6B6B6B" />
              ) : (
                <FontAwesome5 name="eye-slash" size={20} color="#6B6B6B" />
              )}
            </TouchableOpacity>
          </View>
          {/* Fading Effect when signingin */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={!isLoaded || !username || !password}
            className="box-style bg-primary mt-7 disabled:opacity-50"
            // style={{ opacity: signingIn ? 0.5 : 1 }}
            // activeOpacity={0.5}
          >
            <Text className="text-secondary text-center text-xl font-semibold tracking-wider">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        className="flex items-center absolute bottom-10 gap-y-2"
        style={{ opacity: fadeOpacity.current }}
      >
        <Text className="text-primary/50 text-sm font-semibold">
          Designed and Built by
        </Text>
        <Text className="text-primary text-sm font-semibold">
          <Text className="font-bold">Jonak Adipta Kalita</Text> @ 2024 - 11th
          Science
        </Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
