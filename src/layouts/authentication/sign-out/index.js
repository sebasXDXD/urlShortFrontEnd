import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

function SignOut() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Llama a la función de cierre de sesión
    logout();
    // Redirige al usuario a la página de inicio de sesión
    navigate("/authentication/sign-in");
  }, [logout, navigate]);

  return null;
}

export default SignOut;
