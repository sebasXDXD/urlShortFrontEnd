import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importar PropTypes
import { useSelector } from "react-redux";

const AuthMiddleware = ({ route }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (route.renderCondition && !route.renderCondition()) {
    return <Navigate to="/authentication/sign-in" />;
  }
  if (typeof route.component !== "function") {
    console.error("Error: route.component debe ser un componente React válido.");
    return null;
  }
  return <route.component />;
};

// Añadir validación de propiedades usando PropTypes
AuthMiddleware.propTypes = {
  route: PropTypes.shape({
    renderCondition: PropTypes.func.isRequired,
    component: PropTypes.elementType.isRequired,
  }).isRequired,
};

export default AuthMiddleware;
