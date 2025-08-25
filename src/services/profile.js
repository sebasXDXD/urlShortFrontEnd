import axiosInstance from "./axiosInstance";

// Obtener el perfil completo del usuario
const getFullProfile = async () => {
  const response = await axiosInstance.get("/fullProfile");
  return response.data;
};

export default getFullProfile;
