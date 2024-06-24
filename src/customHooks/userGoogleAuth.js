import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { registerGoogleUser } from "services/register";
const useGoogleAuth = () => {
  const [error, setError] = useState(null);

  const getUserInfo = async (accessToken) => {
    const userInfoEndpoint = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;

    try {
      const response = await fetch(userInfoEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const mapGoogleUserDataToUsers = (googleUserData) => {
    // Extraer el nombre de usuario del email (antes del '@')
    const username = googleUserData.email.split("@")[0];

    return {
      first_name: googleUserData.given_name,
      last_name: googleUserData.family_name,
      username: username,
      email: googleUserData.email,
      google_id: googleUserData.id,
      password: "",
    };
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Obtener información del usuario desde Google
      const userInfo = await getUserInfo(response.access_token);
      console.log("Usuario obtenido desde Google:", userInfo);

      // Mapear los datos del usuario de Google a la estructura de usuario del backend
      const userData = mapGoogleUserDataToUsers(userInfo);

      // Llamar automáticamente a la función de registro de usuario en tu backend
      const registeredUser = await registerGoogleUser(userData);
      console.log("Usuario registrado:", registeredUser);

      return userInfo;
    } catch (error) {
      setError("Error al obtener datos del usuario desde Google. Inténtalo de nuevo más tarde.");
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Error al iniciar sesión con Google:", error);
    setError("Error al iniciar sesión con Google. Inténtalo de nuevo más tarde.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
  });

  return {
    googleLogin,
    error,
    setError,
  };
};

export default useGoogleAuth;
