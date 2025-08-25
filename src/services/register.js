import axiosInstance from "./axiosInstance";

const register = async (userData) => {
  const response = await axiosInstance.post("/user", userData);
  return response.data;
};

const registerGoogleUser = async (userData) => {
  console.log("User data:", userData);
  const response = await axiosInstance.post("/googleUser", userData);
  return response.data;
};

export { register, registerGoogleUser };
