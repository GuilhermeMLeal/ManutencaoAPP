import React from "react";
import Index from "./index";
import { AuthProvider } from "./context/authService";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
}
