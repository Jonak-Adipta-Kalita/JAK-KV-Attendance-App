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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

//TODO: Make the screen look more professional?

const SignInScreen = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [viewPassword, setViewPassword] = useState(false);

    const creditsFadeOpacity = useRef(new Animated.Value(1));
    const signingInOpacity = useRef(new Animated.Value(1));

    const pulseSignInBtn = (action: "start" | "stop") => {
        if (action === "start") {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(signingInOpacity.current, {
                        toValue: 0.7,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(signingInOpacity.current, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            Animated.timing(signingInOpacity.current, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start((finished) => {
                if (finished) {
                    signingInOpacity.current.stopAnimation();
                }
            });
        }
    };

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }

        pulseSignInBtn("start");
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
        } finally {
            await pulseSignInBtn("stop");
        }
    }, [isLoaded, username, password, router, setActive, signIn]);

    const disabledButton = !isLoaded || !username || !password;

    useEffect(() => {
        const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
            Animated.timing(creditsFadeOpacity.current, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        });

        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
            Animated.timing(creditsFadeOpacity.current, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidShow.remove();
            keyboardDidHide.remove();
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
                        onChangeText={(emailAddress) =>
                            setUsername(emailAddress)
                        }
                        className="box-style"
                        placeholderTextColor={"#a8a8a8"}
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
                            placeholderTextColor={"#a8a8a8"}
                        />
                        <TouchableOpacity
                            onPress={() => setViewPassword(!viewPassword)}
                            className="absolute right-7"
                            activeOpacity={0.55}
                        >
                            {!viewPassword ? (
                                <FontAwesome5
                                    name="eye"
                                    size={22}
                                    color="#f5f5f5"
                                />
                            ) : (
                                <FontAwesome5
                                    name="eye-slash"
                                    size={20}
                                    color="#f5f5f5"
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <AnimatedTouchableOpacity
                        onPress={onSignInPress}
                        disabled={disabledButton}
                        className="box-style bg-primary mt-7"
                        style={{
                            opacity: disabledButton
                                ? 0.5
                                : signingInOpacity.current,
                        }}
                        activeOpacity={0.3}
                    >
                        <Text className="text-secondary text-center text-xl font-semibold tracking-wider">
                            Sign In
                        </Text>
                    </AnimatedTouchableOpacity>
                </View>
            </View>
            <Animated.View
                className="flex items-center absolute bottom-10 gap-y-2"
                style={{ opacity: creditsFadeOpacity.current }}
            >
                <Text className="text-primary/50 text-sm font-semibold text-primary">
                    Designed and Built by
                </Text>
                <Text className="text-primary text-sm font-semibold">
                    <Text className="font-bold">Jonak Adipta Kalita</Text> @
                    2024 - 11th Science
                </Text>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

export default SignInScreen;
