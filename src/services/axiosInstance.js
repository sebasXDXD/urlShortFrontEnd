import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const publicRoutes = [
      "/login",
      "/loginGoogle",
      "/register",
      "/forgot-password",
      "/refresh-token",
    ];

    const isPublic = publicRoutes.some((route) => config.url.startsWith(route));

    // Retornar una nueva copia de config sin mutar
    return {
      ...config,
      headers: {
        ...config.headers,
        ...(isPublic || !token ? {} : { Authorization: `Bearer ${token}` }),
      },
    };
  },
  (error) => Promise.reject(error)
);

// Interceptor de response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // eslint-disable-next-line no-console
      console.warn("No autorizado, redirigiendo a login...");
      // aquí podrías hacer logout o redirect
    }
    return Promise.reject(error);
  }
);

// Servicios de auth
const login = async (username, password) => {
  const response = await axiosInstance.post("/login", { username, password });
  return response.data;
};

const loginGoogleUser = async (userData) => {
  const response = await axiosInstance.post("/loginGoogle", userData);
  return response.data;
};

export { login, loginGoogleUser };
export default axiosInstance;
