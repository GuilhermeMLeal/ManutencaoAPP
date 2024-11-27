import axios from "axios"

const BASE_URL = "http://localhost:8080/api"

export const endpoints = {
  CERTIFICATION_RULE: "/certification-rule",
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api