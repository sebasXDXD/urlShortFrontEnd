// components/SignUpForm.js
import React, { useState } from "react";
import MDBox from "../../../../components/MDBox";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import ErrorNotification from "../../../../components/ErrorNotification";
import userRegister from "../../../../customHooks/userRegister";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, registrationSuccess, handleSignUp, setError, setRegistrationSuccess } =
    userRegister();

  const handleFormSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      username,
      email,
      confirmEmail,
      password,
      confirmPassword,
    };
    const success = await handleSignUp(userData);
    if (success) {
      alert("Registro exitoso");
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
      <ErrorNotification error={error} onClose={handleErrorClose} />
    </MDBox>
  );
};

export default SignUpForm;
