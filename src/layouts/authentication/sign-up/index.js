// pages/RegisterPage.js
import React from "react";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import SignUpForm from "../components/SingUpForm";
import GoogleLoginButton from "../components/GoogleLoginButton";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

const RegisterPage = () => {
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
              <GoogleLoginButton />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <SignUpForm />
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default RegisterPage;
