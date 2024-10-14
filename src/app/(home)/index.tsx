import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";

// VertualizedList for rendering large list!

export default () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <SignedIn>
      <View className="bg-background h-full flex items-center"></View>
    </SignedIn>
  );
};
