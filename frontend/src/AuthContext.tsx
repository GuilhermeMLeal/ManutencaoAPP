"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback } from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import axios from 'axios';
import { Snackbar, Alert, Button } from '@mui/material';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

interface RefreshTokenModel {
  token: string;
  refreshToken: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //#region Defitions
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [renewTokenState, setRenewTokenState] = useState(false);
  //#endregion

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const storedToken = localStorage.getItem('token');
  //     const storedRefreshToken = localStorage.getItem('refreshToken');
  //     setToken(storedToken);
  //     setRefreshToken(storedRefreshToken);
  //     setIsAuthenticated(!!storedToken);
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);


  //#region useEffect
  useEffect(() => {
    var timeToCount = 10000;
    const checkTokenExpiration = () => {
      if (token) {
        try {
          const decoded: JwtPayload = jwtDecode(token);
          
          const decodedExpiration = (decoded.exp ? decoded.exp * 1000 : null);
          const currentTime = Date.now();
          if (decodedExpiration) {
          const timeLeft = decodedExpiration -  currentTime;
          
          if(timeLeft <= timeToCount){

            timeToCount =  timeLeft;
          }
          
          if (timeLeft <= 0) {
            // Token expirado
            logout();
          } else if (timeLeft <= 60 * 1000 && timeLeft > 50 * 1000) {
            // Token expira em menos de um minuto
            setSnackbarMessage('Seu token expirará em menos de um minuto. Por favor, renove-o.');
            setRenewTokenState(true);
            setSnackbarOpen(true);
          }
          console.log(timeLeft);
          } 
     
        }catch (err) {
          console.log('mfrnvbvsa')
          console.error('Failed to decode token:', err);

      }
      }
    };

    // Verificar a expiração do token a cada 10 segundos
    const intervalId = setInterval(checkTokenExpiration, timeToCount);

    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [token]);
  //#endregion

  //#region Login
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ token: string, refreshToken: string }>('https://localhost:44352/v1/login', { username, password });
      const { token, refreshToken } = response.data;
      setToken(token);
      setRefreshToken(refreshToken);
      console.log(token);
      console.log(refreshToken);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
      console.log(token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Se o backend retornar um erro HTTP com uma mensagem no corpo da resposta
          console.error('Error fetching data:', err);
          setSnackbarMessage(err.response.data);
        } else if (err.request) {
          // Se a solicitação foi feita, mas não houve resposta do servidor
          setSnackbarMessage('Erro de rede: Não foi possível receber uma resposta do servidor.');
        } else {
          // Se ocorreu um erro durante a configuração da solicitação
          setSnackbarMessage('Erro: Não foi possível enviar a solicitação.');
        }
        setSnackbarOpen(true);
        setTimeout(()=>{
          setSnackbarOpen(false);
          setSnackbarMessage('');
        }, 5000)
      }
      throw new Error('Login failed');
    }
  };

  //#endregion

  //#region RenewToken
  const renewToken = async () => {
    const storedToken = await localStorage.getItem('token'); // Assuming getStoredToken returns the token
    const storedRefreshToken = await localStorage.getItem('refreshToken');
    console.log('token'+ storedToken);
    console.log('refresh' + storedRefreshToken);
    if (storedRefreshToken != null) { // Ch eck for refreshToken existence
      
        await axios.post<RefreshTokenModel>('https://localhost:44352/v1/refresh', 
        { token: storedToken, refreshToken: storedRefreshToken },
        { 
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
          const {token, refreshToken } = response.data;
          setToken(token);
          setRefreshToken(refreshToken);
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          setSnackbarOpen(false); // Assuming this sets a snackbar state
        }).catch(error => logout())
  // Assuming this handles logout logic
      
    }else{
      console.log("nao entrou no if.")
    }
  };
  //#endregion

  //#region Logout
  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };
  //#endregion

  //#region checkAuth
  const checkAuth = useCallback(async () => {
    setIsAuthenticated(true);
    // if (token) {
    //   try {
    //     await axios.post('https://localhost:44352/v1/verifyToken', null, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //       },
    //     });
    //     setIsAuthenticated(true);
    //   } catch (error) {
    //     logout();
    //   }
    // } else {
    //   setIsAuthenticated(false);
    // }
  }, [token]);
  //#endregion

  //#region UseEffect to checkAuth
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  //#endregion

  return (
    
    <AuthContext.Provider value={{ isAuthenticated, token, refreshToken, login, logout, checkAuth }}>
      {children}
      <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={() => setSnackbarOpen(false)}>
        
        <Alert severity="warning" action={
          <>
          {renewTokenState &&
            <Button color="inherit" size="small" onClick={() => {renewToken(); setSnackbarOpen(false); setRenewTokenState(false); }}>
             Manter conectado.
            </Button>
          }
          
          <Button color="inherit" size="small" onClick={()=>setSnackbarOpen(false)}>
            Fechar mensagem.
          </Button>
          </>
        }>
          
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
