import axiosInstance from "./axiosInstance";

const login = async (username, password) => {
  const response = await axiosInstance.post("/login", { username, password });
  return response.data;
};

// Login con Google
const loginGoogleUser = async (userData) => {
  const response = await axiosInstance.post("/loginGoogle", userData);
  return response.data;
};

export { login, loginGoogleUser };
