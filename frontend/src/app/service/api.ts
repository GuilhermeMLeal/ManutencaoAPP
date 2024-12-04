import axios from "axios"

const BASE_URL = ""

export const endpoints = {
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export default api