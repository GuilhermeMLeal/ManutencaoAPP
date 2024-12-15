import axios, { AxiosInstance } from "axios";
// import { getAccessToken } from "../../utils/storage";

const transformResponseForLogin = [
  (data) => {
    try {
      return JSON.parse(data);
    } catch {
      // Retorna o dado original caso não seja JSON
      return data;
    }
  },
];

// Instância específica para login
const loginApiClient = axios.create({
  baseURL: "http://localhost:3001/api", // Substituir pelo endpoint correto
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: transformResponseForLogin,
});

// Interceptor para tratar respostas e erros no login
loginApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição de login:", error.response || error.message);
    return Promise.reject(error);
  }
);

const transformResponse = [
  (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Erro ao converter a resposta para JSON:", error);
      return data;
    }
  },
];

const validateToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:3001/api/Auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200; // Retorna true se o token for válido
  } catch (error) {
    console.error("Erro ao validar o token:", error.response?.data || error.message);
    return false; // Token inválido
  }
};

// Função para criar uma instância do Axios
const createAPIInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    transformResponse,
  });

  // Interceptor de requisição: adiciona o token e verifica sua validade
  instance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const isValid = await validateToken(token);
        if (!isValid) {
          console.error("Token inválido ou expirado. Redirecionando para o login...");
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
          return Promise.reject(new Error("Token inválido ou expirado."));
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Erro ao adicionar token ao cabeçalho:", error);
      return Promise.reject(error);
    }
  );

  // Interceptor de resposta: trata erros globais
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          console.error("Token inválido ou expirado. Faça login novamente.");
          localStorage.removeItem("accessToken");
          window.location.href = "/login"; // Redireciona para o login
        } else if (status === 403) {
          console.error("Acesso negado. Permissão insuficiente.");
        }
      } else {
        console.error("Erro na requisição:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const API_BASE_URLS = {
  userApi: "http://localhost:3001/api",
  machineApi: "http://localhost:3002/api",
  toolApi: "http://localhost:3003/api",
  apiGateway: "http://localhost:3004/api",
  maintenanceApi: "http://localhost:3005/api",
};

const userApiClient = createAPIInstance(API_BASE_URLS.userApi);
const machineApiClient = createAPIInstance(API_BASE_URLS.machineApi);
const toolApiClient = createAPIInstance(API_BASE_URLS.toolApi);
const maintenanceApiClient = createAPIInstance(API_BASE_URLS.maintenanceApi);
const apiGatewayClient = createAPIInstance(API_BASE_URLS.apiGateway);

export {
  userApiClient,
  machineApiClient,
  toolApiClient,
  maintenanceApiClient,
  apiGatewayClient,
  createAPIInstance,
  API_BASE_URLS,
  loginApiClient,
};
