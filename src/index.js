// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "providers/AuthProvider";

// Obtener el valor de la variable de entorno
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
);
