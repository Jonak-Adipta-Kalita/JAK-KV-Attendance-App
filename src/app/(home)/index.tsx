import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";

// VertualizedList for rendering large list!

export default () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.username}</Text>
        <Button title="Sign Out" onPress={async () => await signOut()} />
      </SignedIn>
    </View>
  );
};
