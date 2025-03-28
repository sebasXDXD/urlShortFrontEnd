import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import userGoogleAuth from "../../../../customHooks/userGoogleAuth";
import userGoogleLoginAuth from "../../../../customHooks/userGoogleLoginAuth"; // Assuming this hook is for login
import ViewTypes from "../../../../constants/viewTypes";

function GoogleLoginButton({ viewType }) {
  let googleLogin;
  if (viewType === ViewTypes.REGISTER) {
    googleLogin = userGoogleAuth().googleLogin;
  } else if (viewType === ViewTypes.LOGIN) {
    googleLogin = userGoogleLoginAuth().googleLogin; // Assuming a different hook for login
  }

  return (
    <IconButton color="white" onClick={() => googleLogin()} sx={{ backgroundColor: "transparent" }}>
      <GoogleIcon />
    </IconButton>
  );
}

GoogleLoginButton.propTypes = {
  viewType: PropTypes.oneOf([ViewTypes.REGISTER, ViewTypes.LOGIN]).isRequired,
};

export default GoogleLoginButton;
