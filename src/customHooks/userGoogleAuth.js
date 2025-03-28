import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { registerGoogleUser } from "services/register";

const useGoogleAuth = () => {
  const [error, setError] = useState(null);

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
      first_name: googleUserData.given_name,
      last_name: googleUserData.family_name,
      username,
      email: googleUserData.email,
      google_id: googleUserData.id,
      password: "",
    };
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      // Obtener información del usuario desde Google
      const userInfo = await getUserInfo(response.access_token);

      // Mapear los datos del usuario de Google a la estructura de usuario del backend
      const userData = mapGoogleUserDataToUsers(userInfo);

      // Llamar automáticamente a la función de registro de usuario en tu backend
      await registerGoogleUser(userData);

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

export default useGoogleAuth;
