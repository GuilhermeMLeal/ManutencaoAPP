"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Marcar que estamos no cliente
    setIsMounted(true);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/unauthorized");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Renderiza um fallback até que o componente seja montado
  if (!isMounted) {
    return null; // Evita renderizar no servidor
  }

  // Evita renderizar o conteúdo caso não esteja autenticado
  if (!isAuthenticated) {
    return null; // O redirecionamento será tratado no `useEffect`
  }

  return <>{children}</>;
};

export default PrivateRoute;
