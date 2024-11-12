import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

// The color looks off, its too light....

const SkeletonLoader = () => {
    const opacity = useSharedValue(0.5);

    opacity.value = withRepeat(
        withTiming(0.2, {
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return <Animated.View style={[styles.skeleton, animatedStyle]} />;
};

const styles = StyleSheet.create({
    skeleton: {
        width: 120,
        height: 120,
        borderRadius: 8,
        backgroundColor: "hsl(210, 40%, 85%)",
    },
});

export default SkeletonLoader;
