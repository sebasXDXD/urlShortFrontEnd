import { useState } from "react";
import { register } from "../services/register";

const userRegister = () => {
  const [error, setError] = useState(null);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (userData) => {
    const { email, confirmEmail, password, confirmPassword } = userData;

    if (!isValidEmail(email)) {
      setError("El correo electrónico no es válido");
      return null;
    }
    if (email !== confirmEmail) {
      setError("Los correos electrónicos no coinciden");
      return null;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return null;
    }

    try {
      const result = await register(userData); // ahora trae {status, data}
      return result;
    } catch (err) {
      setError("Error al registrarse. Inténtalo de nuevo más tarde.");
      return null;
    }
  };

  return {
    error,
    handleSignUp,
    setError,
  };
};

export default userRegister;
