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
const loginGoogleUser = async (userData) => {
  console.log("User data:", userData);
  try {
    const response = await axios.post("http://localhost:8000/loginGoogle", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login, loginGoogleUser };
