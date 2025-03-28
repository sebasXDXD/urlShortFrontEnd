import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { loginGoogleUser } from "services/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const useGoogleLoginAuth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const getUserInfo = async (accessToken) => {
    const userInfoEndpoint = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;
    const response = await fetch(userInfoEndpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    return response.json();
  };

  const mapGoogleUserDataToUsers = (googleUserData) => {
    // Extraer el nombre de usuario del email (antes del '@')
    const username = googleUserData.email.split("@")[0];

    return {
      username,
      google_id: googleUserData.id,
    };
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Obtener información del usuario desde Google
      const userInfo = await getUserInfo(response.access_token);

      // Mapear los datos del usuario de Google a la estructura de usuario del backend
      const userData = mapGoogleUserDataToUsers(userInfo);

      // Llamar automáticamente a la función de inicio de sesión de usuario en tu backend
      const loggedInUser = await loginGoogleUser(userData);
      authLogin(loggedInUser.token);
      navigate("/links");
      return userInfo;
    } catch (err) {
      setError("Error al obtener datos del usuario desde Google. Inténtalo de nuevo más tarde.");
      throw err;
    }
  };

  const handleGoogleLoginFailure = () => {
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
