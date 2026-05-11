import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { signIn, signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();

  const handleSignIn = async () => {
    try {
      const result = await signIn("anonymous");
      console.log("[App] signIn result:", JSON.stringify(result));
    } catch (e) {
      console.log("[App] signIn error:", String(e));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Convex Auth Repro</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>isLoading:</Text>
          <Text style={styles.statusValue}>{String(isLoading)}</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>isAuthenticated:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: isAuthenticated ? "green" : "red" },
            ]}
          >
            {String(isAuthenticated)}
          </Text>
        </View>

        {isAuthenticated ? (
          <TouchableOpacity
            style={[styles.button, styles.signOutButton]}
            onPress={() => signOut()}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign in anonymously</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  statusBox: { flexDirection: "row", gap: 8 },
  statusLabel: { fontSize: 16, fontWeight: "600" },
  statusValue: { fontSize: 16 },
  button: {
    marginTop: 24,
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  signOutButton: { backgroundColor: "#dc2626" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
