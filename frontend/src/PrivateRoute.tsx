"use client";

import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "./app/context/AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push("/unauthorized"); // Redireciona para a página não autorizada
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
