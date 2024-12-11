import axios from "axios";
import { getAccessToken } from "../utils/storage";

const IP = "172.24.16.1";
const BASE_URL_AUTH = `http://${IP}:3001/api`;
const BASE_URL_MACHINE = `http://${IP}:3002/api`;
const BASE_URL_TOOL = `http://${IP}:3003/api`;
const BASE_URL_MAINTENANCE = `http://${IP}:3005/api`;

// Configuração padrão de transformResponse
const transformResponse = [
  (data) => {
    try {
      return JSON.parse(data); // Tenta converter para JSON
    } catch (error) {
      console.error("Erro ao converter a resposta para JSON:", error);
      return data; // Retorna como texto se não for JSON
    }
  },
];

// Cria instância de API com base na URL
const createAPIInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    transformResponse,
  });

  // Interceptor para adicionar o token
  instance.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken(); // Obtenha o token do armazenamento
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Erro ao adicionar o token ao cabeçalho:", error);
      return Promise.reject(error);
    }
  );

  // Interceptor para tratar erros globalmente
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Erro na requisição:", error.response || error.message);
      if (error.response && error.response.status === 403) {
        console.error("Acesso negado. Verifique o token.");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Instâncias de APIs específicas
const apiAuth = createAPIInstance(BASE_URL_AUTH);
const apiMachine = createAPIInstance(BASE_URL_MACHINE);
const apiTool = createAPIInstance(BASE_URL_TOOL);
const apiMaintenance = createAPIInstance(BASE_URL_MAINTENANCE);

// Endpoints específicos para os serviços
export const endpointsAuth = { 
  getToken: "/Auth",
  getValidateToken: "/validate-token",
};

export const endpointTool = {
  tool: "/Tool",
};

export const endpointMachine = {
  machine: "/Machines",
};

export const endpointPlace = {
  place: "/Places",
};

export const endpointStatus = {
  status: "/Status",
};

export const endpointMaintenance = {
  maintenance: "/Maintenance",
};

export const endpointRole = {
  role: "/Role",
};

export const endpointUser = {
  user: "/User",
};

export const endpointSquad = {
  squad: "/Squad",
};
export { apiAuth, apiMachine, apiTool, apiMaintenance };
