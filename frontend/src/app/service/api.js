import axios from "axios";
import { getAccessToken } from "../../utils/storage";

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

const createAPIInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    transformResponse,
  });

  instance.interceptors.request.use(
    async (config) => {
      const token = await getAccessToken();
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
};
