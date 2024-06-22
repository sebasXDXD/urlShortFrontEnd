// hooks/useGoogleAuth.js
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const userGoogleAuth = () => {
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

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const userInfo = await getUserInfo(response.access_token);
      console.log(userInfo);
      return userInfo;
    } catch (error) {
      setError("Error al obtener datos del usuario desde Google. Inténtalo de nuevo más tarde.");
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

export default userGoogleAuth;
