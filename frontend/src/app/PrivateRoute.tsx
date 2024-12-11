"use client";
import React from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    // Redireciona para login se não estiver autenticado
    router.push("/login");
    return null; // Evita renderizar a rota protegida antes de redirecionar
  }

  return <>{children}</>;
};

export default PrivateRoute;
