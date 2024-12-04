import axios from "axios"

const BASE_URL_AUTH = "http://192.168.0.1:3001"

const apiAuth = axios.create({
  baseURL: BASE_URL_AUTH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [
    (data) => {
      try {
        return JSON.parse(data); // Tenta converter para JSON
      } catch (error) {
        console.error("Erro ao converter a resposta para JSON:", error);
        return data; // Retorna como texto se não for JSON
      }
    },
  ],
});


export const endpointsAuth = { 
  getToken: "/api/Auth",
  getValidateToken: "/api/validate-token"
}

export { apiAuth }