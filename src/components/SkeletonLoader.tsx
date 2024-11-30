import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const SkeletonLoader = ({
    height,
    width,
}: {
    width: number;
    height: number;
}) => {
    const opacity = useSharedValue(1);

    opacity.value = withRepeat(
        withTiming(0.5, {
            duration: 1000,
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

    return (
        <Animated.View
            style={[styles.skeleton, animatedStyle, { width, height }]}
        />
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: "rgb(51 65 85)",
        borderRadius: 8,
    },
});

export default SkeletonLoader;
