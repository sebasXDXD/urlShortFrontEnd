import axios from "axios";
// Función para obtener todos los links
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
const createLink = async (name, redirectTo, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/link",
      {
        name,
        redirect_to: redirectTo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token al header de Authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener un solo link
const getLink = async (link) => {
  try {
    const response = await axios.get(`http://localhost:8000/link/${link}`);
    return response.data;
  } catch (error) {
    // Manejar los errores según tus necesidades
    throw error;
  }
};

// Exportar todas las funciones
export { getLinks, createLink, getLink };
