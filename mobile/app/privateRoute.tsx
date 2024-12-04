import React from "react";
import { useAuth } from "./context/authService";
import { useNavigation } from "@react-navigation/native";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  if (!isAuthenticated) {
    // Redireciona o usuário para a tela de login
    navigation.navigate("Login"); 
    return null;
  }

  // Se autenticado, renderiza os filhos
  return children;
};

export default PrivateRoute;
