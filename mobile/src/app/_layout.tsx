import { Stack } from "expo-router";
import Index from ".";
import { AuthProvider } from "../context/authService";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
}
