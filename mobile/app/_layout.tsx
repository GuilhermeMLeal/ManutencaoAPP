import React from "react";
import Index from "./index";
import { AuthProvider } from "./context/authService";
import { ReloadProvider } from "./context/reloadContext";

export default function RootLayout() {
  return (
    <ReloadProvider>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </ReloadProvider>
  );
}
