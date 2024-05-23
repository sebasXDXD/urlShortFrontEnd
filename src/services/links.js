import axios from "axios";

// Funcion para obtener links
const getLinks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/links");
    return response.data;
  } catch (error) {
    // Manejar los errores según tus necesidades
    throw error;
  }
};

// Función para crear un nuevo enlace
const createLink = async (name, redirectTo, userId) => {
  try {
    const response = await axios.post("http://localhost:8000/links", {
      name,
      redirect_to: redirectTo,
      user_created_id: userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Exportar ambas funciones
export { getLinks, createLink };
