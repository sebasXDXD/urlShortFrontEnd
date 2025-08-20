import axios from "axios";

const API_URL = "http://localhost:8000";

// Obtener el perfil completo del usuario
const getFullProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fullProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getFullProfile:", error.message);
    throw error;
  }
};

export default getFullProfile;
