import { useState } from "react";
import { register } from "../services/register";

const userRegister = () => {
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (userData) => {
    const { email, confirmEmail, password, confirmPassword } = userData;

    if (!isValidEmail(email)) {
      setError("El correo electrónico no es válido");
      return false;
    }
    if (email !== confirmEmail) {
      setError("Los correos electrónicos no coinciden");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    try {
      await register(userData);
      setRegistrationSuccess(true);
      return true;
    } catch (error) {
      setError("Error al registrarse. Inténtalo de nuevo más tarde.");
      console.error("Error al registrarse:", error);
      return false;
    }
  };

  return {
    error,
    registrationSuccess,
    handleSignUp,
    setError,
    setRegistrationSuccess,
  };
};

export default userRegister;
