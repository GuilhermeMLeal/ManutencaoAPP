import axios from "axios"

const API_BASE_URLS = {
  userApi: "http://localhost:3001",
  machineApi: "http://localhost:3002",
  toolApi: "http://localhost:3003",
  apiGateway: "http://localhost:3004",
};

const userApiClient = axios.create({
  baseURL: API_BASE_URLS.userApi,
});

const machineApiClient = axios.create({
  baseURL: API_BASE_URLS.machineApi,
});

const toolApiClient = axios.create({
  baseURL: API_BASE_URLS.toolApi,
});

const apiGatewayClient = axios.create({
  baseURL: API_BASE_URLS.apiGateway,
});

export { userApiClient, machineApiClient, toolApiClient, apiGatewayClient };