import axios from "axios"

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