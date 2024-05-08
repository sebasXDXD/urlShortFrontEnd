import axios from "axios";

const register = async (userData) => {
  try {
    const response = await axios.post("http://localhost:8000/user", userData);
    // Puedes manejar la respuesta según tus necesidades
    return response.data;
  } catch (error) {
    // Puedes manejar los errores según tus necesidades
    throw error;
  }
};

export default register;
