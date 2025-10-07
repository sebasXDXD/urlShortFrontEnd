import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { registerGoogleUser } from "services/register";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import logger from "../utils/logger";

const useGoogleAuth = () => {
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
      // Obtener datos de Google
      const userInfo = await getUserInfo(response.access_token);

      // Mapear a formato backend
      const userData = mapGoogleUserDataToUsers(userInfo);

      // Llamar a tu backend
      const { status, user } = await registerGoogleUser(userData);

      logger.info("✅ Registro Google backend:", { status, user }); // 👈 reemplazo

      // Guardar token en AuthProvider
      if (user.token) {
        authLogin(user.token);
        navigate("/links"); // redirige al dashboard
      } else {
        logger.warn("⚠️ El backend no devolvió un token"); // 👈 reemplazo
      }

      return userInfo;
    } catch (err) {
      logger.error("❌ Error en handleGoogleLoginSuccess:", err); // 👈 reemplazo
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
