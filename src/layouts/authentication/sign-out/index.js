import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

function SignOut() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Ejecuta después del primer render
    Promise.resolve().then(() => {
      const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
      if (confirmLogout) {
        logout();
        navigate("/authentication/sign-in");
      } else {
        navigate(-1);
      }
    });
  }, [logout, navigate]);

  return null;
}

export default SignOut;
