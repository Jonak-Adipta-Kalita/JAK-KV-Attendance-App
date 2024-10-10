import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};
