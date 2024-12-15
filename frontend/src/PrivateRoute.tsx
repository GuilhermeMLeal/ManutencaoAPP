"use client";

import UnifiedService from "@/service/UserService";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./utils/storage";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      try {
        if (isAuthenticated()) {
          const isValid = await UnifiedService.validateToken();
          setIsAuth(isValid);
        } else {
          setIsAuth(false);
        }
      } catch {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    validate();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Component /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
