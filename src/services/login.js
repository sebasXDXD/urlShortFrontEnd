import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8000/login", { username, password });
    // Puedes manejar la respuesta según tus necesidades
    return response.data;
  } catch (error) {
    // Puedes manejar los errores según tus necesidades
    throw error;
  }
};

export default login;
