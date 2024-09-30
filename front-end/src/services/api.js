// src/services/api.js
import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
});

// Set the authorization token for all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace with your token retrieval logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
