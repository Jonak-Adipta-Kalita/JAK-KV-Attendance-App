import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.username}</Text>
        <Button title="Sign Out" onPress={async () => await signOut()} />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
};
