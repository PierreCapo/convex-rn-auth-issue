import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV({ id: "AUTH" });

const ConvexStorageClient = {
  getItem: async (key: string) => storage.getString(key),
  setItem: async (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: async (key: string) => {
    storage.remove(key);
  },
};

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
  verbose: true,
  logger: true,
});

export default function RootLayout() {
  return (
    <ConvexAuthProvider client={convex} storage={ConvexStorageClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ConvexAuthProvider>
  );
}
