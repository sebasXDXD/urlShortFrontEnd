import axiosInstance from "./axiosInstance";

const register = async (userData) => {
  const response = await axiosInstance.post("/user", userData);
  console.log(response);
  return { status: response.status, user: response.data };
};

const registerGoogleUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/googleUser", userData);

    // 👀 imprimir todo el response (status, headers, data, etc.)
    console.log("Response completo:", response);

    // 👀 imprimir solo lo que devuelves al frontend
    console.log("Lo que retorna la función:", {
      status: response.status,
      user: response.data,
    });

    return { status: response.status, user: response.data };
  } catch (error) {
    console.error("Error en registerGoogleUser:", error);
    throw error;
  }
};

export { register, registerGoogleUser };
