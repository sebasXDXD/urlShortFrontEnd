import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LockIcon from "@mui/icons-material/Lock";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function SecuritySettings() {
  return (
    <Card>
      <MDBox p={3}>
        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
          <LockIcon color="info" />
          <MDTypography variant="h6" fontWeight="medium">
            Seguridad
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox mt={3}>
          <MDTypography variant="subtitle2" mb={2}>
            Cambio de Contraseña
          </MDTypography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MDInput type="password" label="Contraseña actual" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput type="password" label="Nueva contraseña" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDInput type="password" label="Confirmar contraseña" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="info">
                Actualizar contraseña
              </Button>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default SecuritySettings;
