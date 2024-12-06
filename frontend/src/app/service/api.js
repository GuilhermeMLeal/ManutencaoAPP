import axios from "axios"

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

const API_BASE_URLS = {
  userApi: "http://localhost:3001",
  machineApi: "http://localhost:3002",
  toolApi: "http://localhost:3003",
  apiGateway: "http://localhost:3004",
};

const userApiClient = axios.create({
  baseURL: API_BASE_URLS.userApi,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const machineApiClient = axios.create({
  baseURL: API_BASE_URLS.machineApi,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const toolApiClient = axios.create({
  baseURL: API_BASE_URLS.toolApi,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiGatewayClient = axios.create({
  baseURL: API_BASE_URLS.apiGateway,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { userApiClient, machineApiClient, toolApiClient, apiGatewayClient };