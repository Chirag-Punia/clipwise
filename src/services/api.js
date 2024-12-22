import axios from "axios";

const API_URL = "https://clipwise.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(1);
  }
  return config;
});

export async function login(email, password) {
  const response = await api.post("/auth/login", { email, password });

  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

export async function signup(email, password) {
  const response = await api.post("/auth/signup", { email, password });

  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

export async function generateScript(prompt, language) {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await api.post(
    "/scripts/generate",
    { prompt, language },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
  return response.data;
}

export async function getScripts() {
  const token = localStorage.getItem("token");
  const response = await api.get("/scripts", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return response.data;
}
