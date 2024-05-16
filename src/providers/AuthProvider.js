import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes para validar las props

// Creamos el contexto
const AuthContext = createContext();

// Creamos el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Función para iniciar sesión
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!token;
  };

  // Función para obtener el token de acceso
  const getToken = () => {
    return token;
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Especifica las propTypes para AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo React y es requerido
};

// Función para utilizar el contexto en otros componentes
export const useAuth = () => useContext(AuthContext);
