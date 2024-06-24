import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { loginGoogleUser } from "services/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
const useGoogleLoginAuth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin, isAuthenticated } = useAuth();
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
      username: username,
      google_id: googleUserData.id,
    };
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Obtener información del usuario desde Google
      const userInfo = await getUserInfo(response.access_token);
      console.log("Usuario obtenido desde Google:", userInfo);

      // Mapear los datos del usuario de Google a la estructura de usuario del backend
      const userData = mapGoogleUserDataToUsers(userInfo);

      // Llamar automáticamente a la función de inicio de sesión de usuario en tu backend
      const loggedInUser = await loginGoogleUser(userData);
      authLogin(loggedInUser.token);
      navigate("/tables");
      return userInfo;
    } catch (error) {
      setError("Error al obtener datos del usuario desde Google. Inténtalo de nuevo más tarde.");
      console.error("Error al autenticar usuario:", error);
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

export default useGoogleLoginAuth;
