import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MDBox from "../../../../components/MDBox";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import ErrorNotification from "../../../../components/ErrorNotification";
import userRegister from "../../../../customHooks/userRegister";
import { login } from "../../../../services/login"; // mismo login de SignIn
import { useAuth } from "../../../../providers/AuthProvider"; // para guardar token

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, handleSignUp, setError } = userRegister();
  const { login: authLogin } = useAuth(); // usamos el contexto de auth
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      confirmEmail,
      password,
      confirmPassword,
    };

    const result = await handleSignUp(userData);

    if (result && (result.status === 200 || result.status === 201)) {
      try {
        // login automático
        const response = await login(email, password);
        authLogin(response.token);
        navigate("/links");
      } catch (err) {
        console.error("Error en login automático después del registro:", err);
      }
    }
  };

  const handleErrorClose = () => {
    setError(null);
  };

  return (
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
      <MDBox mt={4} mb={1}>
        <MDButton variant="gradient" color="info" fullWidth onClick={handleFormSubmit}>
          Registrarse
        </MDButton>
      </MDBox>
      <MDBox mt={3} mb={1} textAlign="center">
        <MDTypography variant="button" color="text">
          Don&apos;t have an account?{" "}
          <MDTypography
            component={Link}
            to="../../authentication/sign-in"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Sign in
          </MDTypography>
        </MDTypography>
      </MDBox>
      <ErrorNotification error={error} onClose={handleErrorClose} />
    </MDBox>
  );
}

export default SignUpForm;
