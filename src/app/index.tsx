import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex items-center justify-center h-full w-full">
        <Text className="text-blue-500">Hello, World!</Text>
      </View>
    </SafeAreaView>
  );
};
