// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "providers/AuthProvider";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </AuthProvider>
);
