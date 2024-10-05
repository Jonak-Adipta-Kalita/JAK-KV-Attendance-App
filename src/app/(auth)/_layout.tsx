import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
};
