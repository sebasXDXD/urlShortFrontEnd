import React, { useState } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import ErrorNotification from "components/ErrorNotification";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import register from "../../../services/register";
import IconButton from "@mui/material/IconButton";

function Cover() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!isValidEmail(email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (email !== confirmEmail) {
      setError("Los correos electrónicos no coinciden");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      };
      const response = await register(userData);
      alert("Registro exitoso");
      setRegistrationSuccess(true);
    } catch (error) {
      setError("Error al registrarse. Inténtalo de nuevo más tarde.");
      console.error("Error al registrarse:", error);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    console.log("Login exitoso con Google:", response);
    try {
      const userInfo = await getUserInfo(response.access_token);
      console.log("Datos del usuario:", userInfo);

      // Aquí puedes manejar los datos del usuario según tus necesidades
      // Por ejemplo, puedes establecer los datos del usuario en los estados locales
      setFirstName(userInfo.given_name);
      setLastName(userInfo.family_name);
      setUsername(userInfo.email.split("@")[0]);
      setEmail(userInfo.email);

      // Puedes comentar esta línea si solo deseas imprimir los datos del usuario
      // y no deseas guardarlos en el estado local
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      setError("Error al obtener datos del usuario desde Google. Inténtalo de nuevo más tarde.");
    }
  };
  const getUserInfo = async (accessToken) => {
    const userInfoEndpoint = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;

    try {
      const response = await fetch(userInfoEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Error al iniciar sesión con Google:", error);
    setError("Error al iniciar sesión con Google. Inténtalo de nuevo más tarde.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: handleGoogleLoginFailure,
  });

  const handleAlertClick = () => {
    setRegistrationSuccess(false);
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Regístrate, ¡es gratis! ... por ahora, mientras dure la oferta
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingresa tu correo electrónico y contraseña para registrarte
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <IconButton
                color="white"
                onClick={() => googleLogin()}
                sx={{ backgroundColor: "transparent" }}
              >
                <GoogleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                variant="standard"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                variant="standard"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                variant="standard"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Confirm Email"
                variant="standard"
                fullWidth
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Estoy de acuerdo con los&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Términos y Condiciones
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                Registrarse
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Ya tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Iniciar sesión
                </MDTypography>
              </MDTypography>
            </MDBox>
            <ErrorNotification error={error} onClose={handleErrorClose} />
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
