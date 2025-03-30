import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function ProfileInfo({ userInfo }) {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <MDTypography variant="h6" fontWeight="medium">
            Información de Perfil
          </MDTypography>
          <Button
            variant="text"
            color="info"
            size="small"
            startIcon={<EditIcon fontSize="small" />}
          >
            Editar
          </Button>
        </MDBox>
        <Divider />
        <MDBox component="form" mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MDInput label="Nombre" value={userInfo.firstName} fullWidth disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput label="Apellido" value={userInfo.lastName} fullWidth disabled />
            </Grid>
            <Grid item xs={12}>
              <MDInput label="Email" value={userInfo.email} fullWidth disabled />
            </Grid>
            <Grid item xs={12}>
              <MDInput label="Empresa" value={userInfo.company} fullWidth disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput label="País" value={userInfo.country} fullWidth disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput label="Teléfono" value={userInfo.phone} fullWidth disabled />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Definir PropTypes para validar userInfo
ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    company: PropTypes.string,
    country: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default ProfileInfo;
