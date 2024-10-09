import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Button, Text, View } from "react-native";

export default () => {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.username}</Text>
        <Button title="Sign Out" onPress={async () => await signOut()} />
      </SignedIn>
    </View>
  );
};
