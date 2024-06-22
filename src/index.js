import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "providers/AuthProvider";

const clientId = "93875266676-sngj4e8rq58mjmpnkv6rgt06bln0o6mh.apps.googleusercontent.com";

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
