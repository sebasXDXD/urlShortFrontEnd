// components/GoogleLoginButton.js
import React from "react";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import userGoogleAuth from "../../../../customHooks/userGoogleAuth";

const GoogleLoginButton = () => {
  const { googleLogin } = userGoogleAuth();

  return (
    <IconButton color="white" onClick={() => googleLogin()} sx={{ backgroundColor: "transparent" }}>
      <GoogleIcon />
    </IconButton>
  );
};

export default GoogleLoginButton;
