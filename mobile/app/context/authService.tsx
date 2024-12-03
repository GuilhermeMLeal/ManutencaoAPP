import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { getAccessToken, getTokens, storeAccessToken, storeTokens } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface DecodedToken {
  exp: number; // Tempo de expiração em segundos desde a época Unix
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: any) => {
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchTokens = async (): Promise<string | null> => {
    if (isAuthenticated) {
      return getAccessToken(); // Certifique-se de que `getAccessToken` é uma função
    }
  
    return null; // Caso não esteja autenticado, retorna null
  };
  
 
  useEffect(() => {
    let timeToCount = 10000; // Tempo padrão inicial de verificação (10 segundos)
    let intervalId: NodeJS.Timeout | null = null;

    const checkTokenExpiration = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await fetchTokens();
          if (accessToken) {
            const decoded: JwtPayload = jwtDecode(accessToken);
            const decodedExpiration = decoded.exp ? decoded.exp * 1000 : null;
            const currentTime = Date.now();

            if (decodedExpiration) {
              const timeLeft = decodedExpiration - currentTime;

              console.log('Tempo restante:', timeLeft);

              if (timeLeft <= 0) {
                // Token expirado
                logout();
              } else if (timeLeft <= timeToCount) {
                // Ajusta o intervalo dinamicamente para verificar mais próximo da expiração
                timeToCount = timeLeft;
                clearInterval(intervalId!);
                intervalId = setInterval(checkTokenExpiration, timeToCount);
              }
            }
          }
        } catch (err) {
          console.error('Falha ao decodificar o token:', err);
        }
      }
    };

    // Configura o intervalo inicial
    intervalId = setInterval(checkTokenExpiration, timeToCount);

    // Limpa o intervalo ao desmontar o componente
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
    }, [isAuthenticated, fetchTokens]);

  const login = async (username: string, password: string) => {
    try {
      //192.168.0.11
      const response = await axios.post('http://192.168.0.11:3001/api/Auth', { username, password });
  
      console.log(response);
  
      // Verifica se o token está na propriedade `data`
      const token = response.data; // ou `response.data.token` se for um objeto com `token`
      
      if (!token) {
        throw new Error('Token não retornado pela API.');
      }
  
      console.log('Token recebido:', token);
      storeAccessToken({accessToken: token});
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };    

  // Função para logout
  const logout = () => {
    setIsAuthenticated(false);
    setExpiresIn(null);
  };

  // Função para renovar o token
  const refreshAccessToken = async () => {
    try {
      // isAuthenticated = false;
      // const response = await axios.post('/refresh-token', { refreshToken });
      // const { accessToken, expiresIn } = response.data;

      // // Atualiza o accessToken e o tempo de expiração
      // setAccessToken(accessToken);
      // setExpiresIn(expiresIn);
    } catch (error) {
      console.error('Erro ao renovar o token:', error);
      logout();
    }
  };

  // Efeito para monitorar o tempo de expiração do token
  useEffect(() => {
    if (!isAuthenticated || !expiresIn) return;

    // Define o tempo antes do qual o token deve ser renovado (ex: 1 minuto antes de expirar)
    const renewTime = expiresIn * 1000 - 60 * 1000;

    const timer = setTimeout(() => {
      refreshAccessToken(); // Renova o token
    }, renewTime);

    // Limpa o timer ao desmontar ou mudar o token
    return () => clearTimeout(timer);
  }, [expiresIn]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para utilizar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
